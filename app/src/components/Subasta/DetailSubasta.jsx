import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pusher from "pusher-js";
import SubastaService from "@/services/SubastaService";
import PujaService from "@/services/PujaService";
import toast from "react-hot-toast";
import {
  Clock, Gavel, ArrowLeft, TrendingUp, User,
  FilmIcon, Crown, Trophy, AlertCircle, Zap,
  ChevronUp, Shield, Calendar, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoriaGlow, categoriaStyles } from "@/utils/categoriaColors";

// ── usuario actual ──
const USUARIO_ACTUAL_ID = 7;

function getGlow(categorias) {
  if (!categorias?.length) return { hex: "#facc15", rgb: "250,204,21" };
  const desc = categorias[0].descripcion;
  const g = categoriaGlow[desc];
  if (g) return { hex: g.hex, rgb: g.rgb };
  const cat = desc.toLowerCase();
  if (cat.includes("electrico")) return { hex: "#facc15", rgb: "250,204,21" };
  if (cat.includes("fuego"))     return { hex: "#ef4444", rgb: "239,68,68" };
  if (cat.includes("agua"))      return { hex: "#3b82f6", rgb: "59,130,246" };
  if (cat.includes("planta"))    return { hex: "#22c55e", rgb: "34,197,94" };
  if (cat.includes("pokemon"))   return { hex: "#a855f7", rgb: "168,85,247" };
  if (cat.includes("entrenador"))return { hex: "#f97316", rgb: "249,115,22" };
  return { hex: "#facc15", rgb: "250,204,21" };
}

// ── Contador legible tipo "2 días 4 h" / "45 min 20 s" ──
function formatTiempo(diff) {
  if (diff <= 0) return null;
  const dias  = Math.floor(diff / 86400000);
  const horas = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const segs  = Math.floor((diff % 60000) / 1000);

  if (dias >= 7) {
    const semanas = Math.floor(dias / 7);
    const diasRest = dias % 7;
    return {
      partes: diasRest > 0
        ? [{ val: semanas, label: semanas === 1 ? "semana" : "semanas" }, { val: diasRest, label: diasRest === 1 ? "día" : "días" }]
        : [{ val: semanas, label: semanas === 1 ? "semana" : "semanas" }],
      urgencia: "low"
    };
  }
  if (dias >= 1) {
    return {
      partes: [
        { val: dias,  label: dias === 1 ? "día" : "días" },
        { val: horas, label: "h" }
      ],
      urgencia: dias >= 3 ? "low" : "medium"
    };
  }
  if (horas >= 1) {
    return {
      partes: [
        { val: horas, label: "h" },
        { val: mins,  label: "min" }
      ],
      urgencia: horas >= 6 ? "medium" : "high"
    };
  }
  return {
    partes: [
      { val: mins, label: "min" },
      { val: segs, label: "s" }
    ],
    urgencia: mins >= 5 ? "high" : "critical"
  };
}

function Contador({ fechaCierre, onExpirado }) {
  const [data,     setData]     = useState(null);
  const [expirado, setExpirado] = useState(false);
  const called = useRef(false);

  useEffect(() => {
    const calcular = () => {
      const diff = new Date(fechaCierre) - new Date();
      if (diff <= 0) {
        setExpirado(true);
        setData(null);
        if (!called.current) { called.current = true; onExpirado?.(); }
        return;
      }
      setData(formatTiempo(diff));
    };
    calcular();
    const interval = setInterval(calcular, 1000);
    return () => clearInterval(interval);
  }, [fechaCierre]);

  const urgenciaColor = {
    low:      { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/8",  dot: "bg-emerald-400" },
    medium:   { text: "text-yellow-400",  border: "border-yellow-500/30",  bg: "bg-yellow-500/8",   dot: "bg-yellow-400" },
    high:     { text: "text-orange-400",  border: "border-orange-500/30",  bg: "bg-orange-500/8",   dot: "bg-orange-400" },
    critical: { text: "text-red-400",     border: "border-red-500/30",     bg: "bg-red-500/8",      dot: "bg-red-400 animate-ping" },
  };

  if (expirado) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-red-500/10 border-red-500/30">
        <Clock className="w-3.5 h-3.5 text-red-400" />
        <span className="text-red-400 font-bold text-sm">Subasta cerrada</span>
      </div>
    );
  }

  if (!data) return null;
  const c = urgenciaColor[data.urgencia];

  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${c.bg} ${c.border}`}>
      <div className="relative flex items-center">
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      </div>
      <Clock className={`w-3.5 h-3.5 ${c.text}`} />
      <div className="flex items-baseline gap-2">
        {data.partes.map((p, i) => (
          <span key={i} className="flex items-baseline gap-0.5">
            <span className={`font-black text-base font-mono ${c.text}`}>{p.val}</span>
            <span className={`text-[11px] font-semibold ${c.text} opacity-70`}>{p.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Fila de puja animada ──
function PujaRow({ puja, index, isNew }) {
  const [highlight, setHighlight] = useState(isNew);
  useEffect(() => {
    if (isNew) {
      const t = setTimeout(() => setHighlight(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isNew]);

  return (
    <div className={`
      flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-700
      ${index === 0
        ? "bg-yellow-400/8 border-yellow-400/25"
        : highlight
          ? "bg-white/[0.06] border-white/15"
          : "bg-white/[0.02] border-white/[0.05]"
      }
    `}
    style={{
      animation: isNew ? "slideIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" : undefined
    }}>
      <div className="flex items-center gap-3">
        {index === 0 ? (
          <div className="w-7 h-7 rounded-xl bg-yellow-400/15 border border-yellow-400/30 flex items-center justify-center">
            <Crown className="w-3.5 h-3.5 text-yellow-400" />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <span className="text-[10px] font-bold text-white/30">#{index + 1}</span>
          </div>
        )}
        <div>
          <p className="text-white/80 text-sm font-semibold leading-none">{puja.usuario?.nombre ?? "—"}</p>
          <p className="text-white/25 text-[10px] mt-0.5">{puja.fechaPuja}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {index === 0 && <ChevronUp className="w-3 h-3 text-yellow-400" />}
        <span className={`font-black text-base ${index === 0 ? "text-yellow-400" : "text-white/50"}`}>
          ${Number(puja.montoOfertado).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export function DetailSubasta() {
  const navigate = useNavigate();
  const { id }   = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  const [subasta,    setSubasta]    = useState(null);
  const [pujas,      setPujas]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [monto,      setMonto]      = useState("");
  const [montoError, setMontoError] = useState(""); // validación inline
  const [pujaSuper,  setPujaSuper]  = useState(false);
  const [cerrada,    setCerrada]    = useState(false);
  const [enviando,   setEnviando]   = useState(false);
  const [nuevasPujas, setNuevasPujas] = useState(new Set());
  const [mounted,    setMounted]    = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Carga inicial
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSub = await SubastaService.getSubastaById(id);
        const subastaData = resSub.data?.data ?? resSub.data;
        setSubasta(subastaData);
        if (subastaData?.idEstadoSubasta != 1) setCerrada(true);

        try {
          const resPujas = await PujaService.getPujasbySubasta(id);
          const pujasData = resPujas.data?.data ?? resPujas.data;
          if (pujasData && Array.isArray(pujasData)) {
            setPujas([...pujasData].sort((a, b) => Number(b.montoOfertado) - Number(a.montoOfertado)));
          }
        } catch { setPujas([]); }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [id]);

  // Pusher
  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, { cluster: import.meta.env.VITE_PUSHER_CLUSTER });
    const channel = pusher.subscribe("subasta-" + id);

    channel.bind("nueva-puja", (data) => {
      setPujas((prev) => {
        const liderAnterior = prev[0];
        const nuevas = [data.puja, ...prev].sort((a, b) => Number(b.montoOfertado) - Number(a.montoOfertado));
        if (liderAnterior && String(liderAnterior.idUsuario) === String(USUARIO_ACTUAL_ID) && String(data.puja.idUsuario) !== String(USUARIO_ACTUAL_ID)) {
          setPujaSuper(true);
          setTimeout(() => setPujaSuper(false), 5000);
        }
        return nuevas;
      });
      setNuevasPujas(prev => { const s = new Set(prev); s.add(data.puja.idPuja); setTimeout(() => setNuevasPujas(p => { const n = new Set(p); n.delete(data.puja.idPuja); return n; }), 2500); return s; });
    });

    channel.bind("subasta-cerrada", (data) => {
      setCerrada(true);
      setSubasta(prev => prev ? { ...prev, idEstadoSubasta: 2 } : prev);
      toast.success("La subasta ha finalizado. Ganador: " + (data.ganador?.nombre ?? "Sin ganador"));
    });

    return () => { channel.unbind_all(); pusher.unsubscribe("subasta-" + id); pusher.disconnect(); };
  }, [id]);

  const handleExpirado = async () => {
    try {
      const res = await SubastaService.getSubastaById(id);
      setSubasta(res.data?.data ?? res.data);
      setCerrada(true);
    } catch (e) { console.error(e); }
  };

  // Validar monto en tiempo real
  const handleMontoChange = (val) => {
    setMonto(val);
    if (!val) { setMontoError(""); return; }
    const num = Number(val);
    if (isNaN(num) || num <= 0) { setMontoError("Ingresa un número válido"); return; }
    if (num < montoMinimo) {
      setMontoError(`Mínimo requerido: $${montoMinimo.toLocaleString()}`);
      return;
    }
    setMontoError("");
  };

  const handlePujar = async () => {
    const montoNum = Number(monto);
    if (!monto || isNaN(montoNum) || montoNum <= 0) {
      setMontoError("Ingresa un monto válido");
      return;
    }
    if (montoNum < montoMinimo) {
      setMontoError(`El monto mínimo es $${montoMinimo.toLocaleString()}`);
      return;
    }
    setEnviando(true);
    try {
      const res = await PujaService.createPuja({
        idUsuario:    USUARIO_ACTUAL_ID,
        idSubasta:    Number(id),
        montoOfertado: montoNum,
      });
      if (res.data?.success === false) {
        setMontoError(res.data.message);
      } else {
        setMonto("");
        setMontoError("");
        toast.success("¡Puja registrada correctamente!");
      }
    } catch { toast.error("Error al registrar la puja"); }
    finally { setEnviando(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/10 rotate-45" />
            <div className="absolute inset-2 rounded-xl border-2 border-yellow-400/20 animate-spin" />
            <Gavel className="absolute inset-0 m-auto w-6 h-6 text-yellow-400/60" />
          </div>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase">Cargando subasta</p>
        </div>
      </div>
    );
  }

  if (!subasta) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7 text-red-400" />
          </div>
          <p className="text-white/60 text-sm">No se encontró la subasta</p>
          <Button onClick={() => navigate(-1)} variant="ghost" className="text-white/30 hover:text-white/60 text-xs">
            Volver
          </Button>
        </div>
      </div>
    );
  }

  const data        = subasta;
  const glow        = getGlow(data?.carta?.categorias);
  const isActive    = String(data?.idEstadoSubasta) === "1" && !cerrada;
  const pujaLider   = pujas[0] ?? null;
  const esVendedor  = String(data?.idUsuario) === String(USUARIO_ACTUAL_ID);
  const montoMinimo = pujaLider
    ? Number(pujaLider.montoOfertado) + Number(data?.incrementoMin)
    : Number(data?.precio) + Number(data?.incrementoMin);

  const categorias = data?.carta?.categorias ?? [];

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { opacity:0; transform:translateY(-8px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulseBorder {
          0%,100% { box-shadow: 0 0 0 0 rgba(250,204,21,0); }
          50%      { box-shadow: 0 0 0 6px rgba(250,204,21,0.08); }
        }
        .anim-1 { animation: fadeUp 0.5s cubic-bezier(0.34,1.2,0.64,1) both; }
        .anim-2 { animation: fadeUp 0.5s 0.08s cubic-bezier(0.34,1.2,0.64,1) both; }
        .anim-3 { animation: fadeUp 0.5s 0.16s cubic-bezier(0.34,1.2,0.64,1) both; }
        .anim-4 { animation: fadeUp 0.5s 0.24s cubic-bezier(0.34,1.2,0.64,1) both; }
        .card-glow { animation: pulseBorder 3s ease-in-out infinite; }
      `}</style>

      {/* Notif puja superada */}
      {pujaSuper && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-5 py-3 rounded-2xl border border-red-500/30 bg-[#0d1424]/95 backdrop-blur-xl shadow-2xl"
          style={{ animation: "slideIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <p className="text-red-400 font-bold text-sm">¡Tu puja fue superada!</p>
            <p className="text-white/30 text-xs">Alguien ofreció más. ¿Vuelves a pujar?</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#020617] px-4 py-8 relative overflow-hidden">

        {/* Fondo atmosférico */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[120px] opacity-[0.04]"
            style={{ background: glow.hex }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full blur-[100px] opacity-[0.03]"
            style={{ background: glow.hex }} />
          {/* Grid sutil */}
          <div className="absolute inset-0 opacity-[0.015]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className={`relative z-10 max-w-6xl mx-auto space-y-6 transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>

          {/* Back */}
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Regresar
          </button>

          {/* ─── HEADER CARD ─── */}
          <div className="anim-1 relative overflow-hidden rounded-3xl border bg-gradient-to-b from-[#0d1424] to-[#080d18] backdrop-blur-xl"
            style={{ borderColor: `rgba(${glow.rgb},0.15)` }}>

            {/* Línea superior coloreada */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent 0%, rgba(${glow.rgb},0.8) 40%, rgba(${glow.rgb},0.8) 60%, transparent 100%)` }} />

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* Título */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                    style={{ background: `rgba(${glow.rgb},0.1)`, borderColor: `rgba(${glow.rgb},0.2)` }}>
                    <Gavel className="w-7 h-7" style={{ color: glow.hex }} />
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-semibold mb-0.5">Subasta en vivo</p>
                    <h1 className="text-2xl font-black text-white tracking-tight">
                      {data.carta?.nombre ?? "—"}
                      <span className="ml-2 text-base font-normal opacity-30">#{data.idSubasta}</span>
                    </h1>
                  </div>
                </div>

                {/* Badges de estado */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold ${
                    isActive ? "bg-emerald-500/8 border-emerald-500/20 text-emerald-400" : "bg-red-500/8 border-red-500/20 text-red-400"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
                    {isActive ? "En curso" : "Finalizada"}
                  </div>
                  {data.fechaCierre && (
                    <Contador fechaCierre={data.fechaCierre} onExpirado={handleExpirado} />
                  )}
                </div>
              </div>

              {/* Categorías */}
              {categorias.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {categorias.map((cat) => {
                    const style = categoriaStyles[cat.descripcion];
                    return (
                      <span key={cat.idCategoria}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          style ?? "bg-white/5 border-white/10 text-white/40"
                        }`}>
                        {cat.descripcion}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Stats bar */}
            <div className="border-t border-white/[0.05] grid grid-cols-3 divide-x divide-white/[0.05]">
              {[
                { label: "Precio base", value: `$${Number(data.precio).toLocaleString()}`, color: "text-yellow-400" },
                { label: "Incremento mín.", value: `$${Number(data.incrementoMin).toLocaleString()}`, color: "text-purple-400" },
                { label: "Total pujas", value: pujas.length, color: "text-blue-400" },
              ].map((s, i) => (
                <div key={i} className="px-6 py-4 text-center">
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-1">{s.label}</p>
                  <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── BODY GRID ─── */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-5">

            {/* COLUMNA IZQUIERDA — carta + puja líder + vendedor */}
            <div className="space-y-5">

              {/* Carta */}
              <div className="anim-2 rounded-3xl border border-white/[0.06] bg-[#0a0f1e]/80 p-6 flex gap-6">
                {/* Imagen */}
                <div className="flex-shrink-0">
                  {data.carta?.imagenes?.length > 0 ? (
                    <div className="relative w-32 h-44 rounded-2xl overflow-hidden border-2 hover:scale-[1.03] transition-all duration-500 shadow-2xl"
                      style={{ borderColor: `rgba(${glow.rgb},0.4)`, boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(${glow.rgb},0.12)` }}>
                      <img src={`${BASE_URL}/${data.carta.imagenes[0].imagen}`} alt={data.carta.nombre} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />
                    </div>
                  ) : (
                    <div className="w-32 h-44 rounded-2xl border-2 border-white/10 bg-[#0a0f1e] flex items-center justify-center text-white/10">
                      <FilmIcon className="w-10 h-10" />
                    </div>
                  )}
                </div>

                {/* Info carta */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h2 className="text-white font-black text-xl">{data.carta?.nombre ?? "—"}</h2>
                    {data.carta?.descripcion && (
                      <p className="text-white/40 text-sm mt-1 leading-relaxed">{data.carta.descripcion}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {data.carta?.condicion?.descripcion && (
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <Shield className="w-3.5 h-3.5 text-green-400" />
                        <div>
                          <p className="text-[9px] text-white/25 uppercase tracking-widest">Condición</p>
                          <p className="text-white/70 text-xs font-semibold">{data.carta.condicion.descripcion}</p>
                        </div>
                      </div>
                    )}
                    {data.carta?.fechaRegistro && (
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <div>
                          <p className="text-[9px] text-white/25 uppercase tracking-widest">Registrada</p>
                          <p className="text-white/70 text-xs font-semibold">{data.carta.fechaRegistro?.slice(0,10)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Puja líder */}
              <div className="anim-3 rounded-3xl border p-6 relative overflow-hidden"
                style={{ borderColor: `rgba(${glow.rgb},0.2)`, background: `linear-gradient(135deg, rgba(${glow.rgb},0.04) 0%, transparent 60%)` }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
                  style={{ background: glow.hex }} />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Puja más alta</p>
                {pujaLider ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-base">{pujaLider.usuario?.nombre ?? "—"}</p>
                        <p className="text-white/30 text-xs">{pujaLider.fechaPuja}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-black text-3xl">${Number(pujaLider.montoOfertado).toLocaleString()}</p>
                      <p className="text-white/25 text-[10px]">próxima mín: ${montoMinimo.toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-white/30 text-sm">Sin pujas aún</p>
                    <div className="text-right">
                      <p className="text-white/50 font-black text-2xl">${Number(data.precio).toLocaleString()}</p>
                      <p className="text-white/25 text-[10px]">precio base</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Vendedor */}
              <div className="anim-4 flex items-center gap-3 p-4 rounded-2xl border border-white/[0.05] bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <User className="w-4.5 h-4.5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-widest font-semibold">Vendedor</p>
                  <p className="text-white/70 text-sm font-semibold">{data.creador?.nombre ?? "—"}</p>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA — formulario + historial */}
            <div className="space-y-5">

              {/* Formulario de puja */}
              {isActive && !esVendedor && (
                <div className="rounded-3xl border border-white/[0.08] bg-[#0a0f1e]/80 p-5 space-y-4"
                  style={{ boxShadow: `0 0 40px rgba(${glow.rgb},0.04)` }}>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" style={{ color: glow.hex }} />
                    <p className="text-white font-bold text-sm">Realizar puja</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm font-bold">$</span>
                      <input
                        type="number"
                        value={monto}
                        onChange={(e) => handleMontoChange(e.target.value)}
                        placeholder={montoMinimo.toLocaleString()}
                        className={`w-full bg-white/[0.04] border rounded-2xl pl-8 pr-4 py-3.5 text-white placeholder-white/15 focus:outline-none text-sm transition-all duration-200 ${
                          montoError
                            ? "border-red-500/50 focus:border-red-500/70"
                            : monto && Number(monto) >= montoMinimo
                              ? "border-emerald-500/40 focus:border-emerald-500/60"
                              : "border-white/[0.08] focus:border-white/20"
                        }`}
                        style={{ borderColor: monto && !montoError ? `rgba(${glow.rgb},0.35)` : undefined }}
                      />
                    </div>
                    {/* Error inline — como advertencia de formulario */}
                    {montoError && (
                      <div className="flex items-center gap-1.5 px-1">
                        <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <p className="text-red-400/80 text-[11px]">{montoError}</p>
                      </div>
                    )}
                    {!montoError && (
                      <p className="text-white/25 text-[11px] px-1">
                        Mínimo: <span className="text-white/40 font-semibold">${montoMinimo.toLocaleString()}</span>
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handlePujar}
                    disabled={enviando || !!montoError || !monto}
                    className="w-full py-3.5 rounded-2xl font-bold text-sm text-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed"
                    style={{ background: `linear-gradient(135deg, ${glow.hex}, rgba(${glow.rgb},0.75))` }}>
                    {enviando ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-black/20 border-t-black/60 rounded-full animate-spin" />
                        Registrando...
                      </span>
                    ) : "Pujar ahora"}
                  </button>
                </div>
              )}

              {esVendedor && isActive && (
                <div className="rounded-3xl border border-yellow-400/15 bg-yellow-400/5 p-5 text-center">
                  <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-5 h-5 text-yellow-400" />
                  </div>
                  <p className="text-yellow-400/70 text-sm font-semibold">Eres el vendedor</p>
                  <p className="text-white/25 text-xs mt-1">No puedes pujar en tu propia subasta</p>
                </div>
              )}

              {!isActive && (
                <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white/60 font-bold text-sm">Subasta finalizada</p>
                    {pujaLider && (
                      <p className="text-white/35 text-xs mt-1">
                        Ganador: <span className="text-yellow-400/80 font-semibold">{pujaLider.usuario?.nombre}</span>
                        {" — "}
                        <span className="text-white/50">${Number(pujaLider.montoOfertado).toLocaleString()}</span>
                      </p>
                    )}
                    {!pujaLider && <p className="text-white/25 text-xs mt-1">Sin pujas registradas</p>}
                  </div>
                </div>
              )}

              {/* Historial */}
              <div className="rounded-3xl border border-white/[0.06] bg-[#0a0f1e]/60 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-white/30" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Historial</p>
                  </div>
                  <span className="text-[10px] font-bold text-white/20 bg-white/[0.04] px-2 py-0.5 rounded-full">
                    {pujas.length} pujas
                  </span>
                </div>

                <div className="p-3 space-y-2 max-h-[360px] overflow-y-auto">
                  {pujas.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-white/15 text-sm">Sin pujas todavía</p>
                      <p className="text-white/10 text-xs mt-1">Sé el primero en pujar</p>
                    </div>
                  ) : (
                    pujas.map((puja, index) => (
                      <PujaRow
                        key={puja.idPuja ?? index}
                        puja={puja}
                        index={index}
                        isNew={nuevasPujas.has(puja.idPuja)}
                      />
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
