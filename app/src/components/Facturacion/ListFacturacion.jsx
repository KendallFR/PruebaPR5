import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import FacturacionService from "@/services/FacturacionService";
import toast from "react-hot-toast";
import {
  CreditCard, CheckCircle, Clock, Trophy,
  User, Gavel, DollarSign, Calendar, RefreshCw
} from "lucide-react";

function EstadoBadge({ estado }) {
  const isPendiente = estado?.toLowerCase().includes("pendiente") || estado === "1";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
      isPendiente
        ? "bg-yellow-400/10 border-yellow-400/25 text-yellow-400"
        : "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isPendiente ? "bg-yellow-400 animate-pulse" : "bg-emerald-400"}`} />
      {isPendiente ? "Pendiente" : "Confirmado"}
    </span>
  );
}

export function ListFacturacion() {
  const [facturas,  setFacturas]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [confirmando, setConfirmando] = useState(null); // id en proceso

  const fetchData = async () => {
    try {
      const res = await FacturacionService.getAll();
      const data = res.data?.data ?? res.data;
      setFacturas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Error al cargar pagos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Pusher — escuchar confirmaciones en tiempo real
  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe("pagos");
    channel.bind("pago-confirmado", (data) => {
      setFacturas(prev => prev.map(f =>
        String(f.idFacturacion) === String(data.facturacion?.idFacturacion)
          ? { ...f, idEstadoFacturacion: 2, resultado: "Confirmado", estadoDescripcion: "Confirmado" }
          : f
      ));
      toast.success("Pago confirmado en tiempo real");
    });
    return () => { channel.unbind_all(); pusher.unsubscribe("pagos"); pusher.disconnect(); };
  }, []);

  const handleConfirmar = async (idFacturacion) => {
    setConfirmando(idFacturacion);
    try {
      await FacturacionService.confirmarPago(idFacturacion);
      // Pusher actualiza la UI, pero también actualizamos localmente por si acaso
      setFacturas(prev => prev.map(f =>
        String(f.idFacturacion) === String(idFacturacion)
          ? { ...f, idEstadoFacturacion: 2, resultado: "Confirmado", estadoDescripcion: "Confirmado" }
          : f
      ));
      toast.success("Pago confirmado correctamente");
    } catch {
      toast.error("Error al confirmar el pago");
    } finally {
      setConfirmando(null);
    }
  };

  const pendientes   = facturas.filter(f => String(f.idEstadoFacturacion) === "1" || f.resultado === "Pendiente");
  const confirmados  = facturas.filter(f => String(f.idEstadoFacturacion) === "2" || f.resultado === "Confirmado");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1e] to-[#020617] px-4 py-10">

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.012]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-semibold">Sistema de pagos</p>
              <h1 className="text-2xl font-black text-white tracking-tight">Registro de Pagos</h1>
            </div>
          </div>
          <button onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white/70 hover:border-white/15 transition-all text-sm">
            <RefreshCw className="w-3.5 h-3.5" />
            Actualizar
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total pagos",   value: facturas.length,    color: "text-white/70",    border: "border-white/[0.06]",    bg: "bg-white/[0.02]",    icon: <DollarSign className="w-4 h-4 text-white/30" /> },
            { label: "Pendientes",    value: pendientes.length,  color: "text-yellow-400",  border: "border-yellow-400/20",   bg: "bg-yellow-400/5",    icon: <Clock className="w-4 h-4 text-yellow-400" /> },
            { label: "Confirmados",   value: confirmados.length, color: "text-emerald-400", border: "border-emerald-500/20",  bg: "bg-emerald-500/5",   icon: <CheckCircle className="w-4 h-4 text-emerald-400" /> },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl border ${s.border} ${s.bg} p-5 flex items-center gap-4`}>
              <div className={`w-10 h-10 rounded-xl border ${s.border} flex items-center justify-center`}>{s.icon}</div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold">{s.label}</p>
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="w-8 h-8 border-2 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin" />
            <p className="text-white/25 text-sm">Cargando pagos...</p>
          </div>
        ) : facturas.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-7 h-7 text-white/15" />
            </div>
            <p className="text-white/30 text-sm">No hay pagos registrados</p>
            <p className="text-white/15 text-xs mt-1">Los pagos se generan automáticamente al cerrar una subasta</p>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/[0.06] bg-[#0a0f1e]/60 overflow-hidden">

            {/* Header tabla */}
            <div className="grid grid-cols-[60px_1fr_1fr_140px_120px_140px] gap-4 px-6 py-3 border-b border-white/[0.05] bg-white/[0.02]">
              {["#", "Comprador", "Subasta", "Monto", "Fecha", "Estado / Acción"].map((h, i) => (
                <p key={i} className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">{h}</p>
              ))}
            </div>

            {/* Filas */}
            <div className="divide-y divide-white/[0.04]">
              {facturas.map((f) => {
                const isPendiente = String(f.idEstadoFacturacion) === "1" || f.resultado === "Pendiente";
                const isConfirmando = confirmando === f.idFacturacion || confirmando === String(f.idFacturacion);
                const monto = Number(f.monto);
                const fecha = f.fechaFactura ? String(f.fechaFactura).slice(0, 16).replace("T", " ") : "—";

                return (
                  <div key={f.idFacturacion}
                    className={`grid grid-cols-[60px_1fr_1fr_140px_120px_140px] gap-4 px-6 py-4 items-center transition-colors hover:bg-white/[0.02] ${
                      !isPendiente ? "opacity-70" : ""
                    }`}>

                    {/* ID */}
                    <span className="text-white/25 text-xs font-mono">#{f.idFacturacion}</span>

                    {/* Comprador */}
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white/70 text-sm font-semibold truncate">{f.usuario?.nombre ?? "—"}</p>
                        <p className="text-white/25 text-[10px] truncate">{f.usuario?.email ?? ""}</p>
                      </div>
                    </div>

                    {/* Subasta / Carta */}
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/15 flex items-center justify-center flex-shrink-0">
                        <Gavel className="w-3 h-3 text-purple-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white/70 text-sm font-semibold truncate">
                          {f.subasta?.carta?.nombre ?? `Subasta #${f.idSubasta}`}
                        </p>
                        <p className="text-white/25 text-[10px]">Subasta #{f.idSubasta}</p>
                      </div>
                    </div>

                    {/* Monto */}
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-yellow-400/60" />
                      <span className="text-yellow-400 font-black text-base">
                        ${isNaN(monto) ? "—" : monto.toLocaleString()}
                      </span>
                    </div>

                    {/* Fecha */}
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-white/20" />
                      <span className="text-white/35 text-xs">{fecha}</span>
                    </div>

                    {/* Estado / Acción */}
                    <div className="flex items-center">
                      {isPendiente ? (
                        <button
                          onClick={() => handleConfirmar(f.idFacturacion)}
                          disabled={isConfirmando}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                          {isConfirmando
                            ? <><span className="w-3 h-3 border border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />Confirmando...</>
                            : <><CheckCircle className="w-3.5 h-3.5" />Confirmar</>
                          }
                        </button>
                      ) : (
                        <EstadoBadge estado={f.resultado ?? f.estadoDescripcion} />
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
