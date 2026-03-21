import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SubastaService from "@/services/SubastaService";

import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Sparkles,
  Clock,
  Zap,
  Globe,
  Gavel,
  Info,
  ArrowLeft,
  Film,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  User,
  FilmIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── Color dinámico según categoría ── */
function getGlow(categorias) {
  if (!categorias?.length) return { hex: "#facc15", rgb: "250,204,21" };
  const cat = categorias[0].descripcion.toLowerCase();
  if (cat.includes("electrico")) return { hex: "#facc15", rgb: "250,204,21" };
  if (cat.includes("fuego"))     return { hex: "#ef4444", rgb: "239,68,68" };
  if (cat.includes("agua"))      return { hex: "#3b82f6", rgb: "59,130,246" };
  if (cat.includes("planta"))    return { hex: "#22c55e", rgb: "34,197,94" };
  if (cat.includes("pokemon"))   return { hex: "#a855f7", rgb: "168,85,247" };
  if (cat.includes("entrenador"))return { hex: "#f97316", rgb: "249,115,22" };
  return { hex: "#facc15", rgb: "250,204,21" };
}

export function DetailSubasta() {
  const navigate  = useNavigate();
  const { id }    = useParams();
  const BASE_URL  = import.meta.env.VITE_BASE_URL + "uploads";

  const [subasta, setSubasta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SubastaService.getSubastaById(id);
        setSubasta(response.data.data);
      } catch (err) {
        console.error("Error al cargar la subasta", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1e] to-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Cargando detalle...</p>
        </div>
      </div>
    );
  }

  const data = subasta;
  const glow = getGlow(data.carta?.categorias);
  const isActive = data.estadoSubasta?.descripcion?.toLowerCase() === "activa";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1e] to-[#020617] px-4 py-10">

      {/* Blobs decorativos */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-8"
          style={{ background: glow.hex }}
        />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">

        {/* BACK */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-white/40 hover:text-white/80 flex items-center gap-2 pl-0 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Regresar</span>
        </Button>

        {/* CARD PRINCIPAL */}
        <div
          className="relative overflow-hidden rounded-3xl border bg-[#0d1424]/90 backdrop-blur-xl shadow-2xl"
          style={{
            borderColor: `rgba(${glow.rgb}, 0.2)`,
            boxShadow: `0 25px 80px rgba(0,0,0,0.7), 0 0 60px rgba(${glow.rgb}, 0.06)`,
          }}
        >
          {/* Barra superior dinámica */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, rgba(${glow.rgb},0.7), transparent)` }}
          />
          {/* Glow interno */}
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-10"
            style={{ background: glow.hex }}
          />

          {/* HEADER */}
          <div className="relative z-10 text-center px-8 pt-10 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                style={{
                  background: `rgba(${glow.rgb}, 0.12)`,
                  borderColor: `rgba(${glow.rgb}, 0.25)`,
                }}
              >
                <Gavel className="w-6 h-6" style={{ color: glow.hex }} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Subasta <span style={{ color: glow.hex }}>#{data.idSubasta}</span>
              </h1>
            </div>

            {/* Stats row */}
            <div className="flex justify-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-4 py-2">
                <span className="text-white/40 text-[11px] uppercase tracking-widest">Precio</span>
                <span className="text-yellow-400 font-black text-base">${data.precio}</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-2">
                <span className="text-white/40 text-[11px] uppercase tracking-widest">Incremento</span>
                <span className="text-purple-300 font-black text-base">${data.incrementoMin}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-white/40 text-[11px] uppercase tracking-widest">Pujas</span>
                <span className="text-blue-300 font-black text-base">{data.cantidadPujas}</span>
              </div>
              <div className={`flex items-center gap-2 rounded-xl px-4 py-2 border ${
                isActive
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-red-500/10 border-red-500/20"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                <span className={`font-bold text-sm ${isActive ? "text-green-300" : "text-red-300"}`}>
                  {data.estadoSubasta.descripcion}
                </span>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="grid md:grid-cols-2 gap-8 p-8 relative z-10">

            {/* COLUMNA IZQUIERDA — imagen TCG */}
            <div className="flex flex-col items-center gap-4">
              {data.carta?.imagenes?.length > 0 ? (
                <>
                  {/* Imagen principal — borde TCG */}
                  <div
                    className="
                      relative w-56 h-80
                      rounded-[16px] overflow-hidden
                      border-[3px]
                      shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)]
                      ring-1 ring-black/50
                      bg-[#0a0f1e]
                      transition-all duration-500
                      hover:scale-[1.03]
                    "
                    style={{
                      borderColor: `rgba(${glow.rgb}, 0.45)`,
                      boxShadow: `
                        0 20px 60px rgba(0,0,0,0.8),
                        0 0 40px rgba(${glow.rgb}, 0.12),
                        inset 0 1px 0 rgba(255,255,255,0.12)
                      `,
                    }}
                  >
                    <img
                      src={`${BASE_URL}/${data.carta.imagenes[0].imagen}`}
                      alt={data.carta.nombre}
                      className="w-full h-full object-cover"
                    />
                    {/* Reflejo superior */}
                    <div className="absolute top-0 left-0 right-0 h-[28%] bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
                    {/* Brillo holográfico */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, rgba(${glow.rgb},0.07) 0%, transparent 50%, rgba(${glow.rgb},0.04) 100%)` }}
                    />
                    {/* Sombra inferior */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    {/* Badge nombre */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                      <div className="bg-black/70 backdrop-blur-sm text-white/70 text-[10px] font-bold px-3 py-1 rounded-full border border-white/10">
                        {data.carta.nombre}
                      </div>
                    </div>
                  </div>

                  {/* Imágenes adicionales */}
                  {data.carta.imagenes.length > 1 && (
                    <div className="flex gap-2 flex-wrap justify-center">
                      {data.carta.imagenes.slice(1).map((img, i) => (
                        <div
                          key={img.idImagen}
                          className="
                            w-16 h-24 rounded-[8px] overflow-hidden
                            border-2 border-white/15
                            shadow-lg shadow-black/50
                            bg-[#0a0f1e]
                            hover:scale-110 hover:border-white/35
                            transition-all duration-200 cursor-pointer
                          "
                        >
                          <img
                            src={`${BASE_URL}/${img.imagen}`}
                            alt={`${data.carta.nombre}-${i + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="w-56 h-80 rounded-[16px] border-2 border-white/10 bg-[#0a0f1e] flex items-center justify-center text-white/15"
                >
                  <FilmIcon className="w-14 h-14" />
                </div>
              )}
            </div>

            {/* COLUMNA DERECHA — info */}
            <CardContent className="p-0 space-y-4 text-white">

              {/* Datos de la carta */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">
                  Información de la carta
                </p>

                {/* Nombre carta */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors duration-200">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ background: `rgba(${glow.rgb},0.10)`, borderColor: `rgba(${glow.rgb},0.20)` }}
                  >
                    <Sparkles className="w-4 h-4" style={{ color: glow.hex }} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Carta</p>
                    <p className="text-white/80 text-sm font-semibold mt-0.5">{data.carta.nombre}</p>
                  </div>
                </div>

                {/* Condición */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors duration-200">
                  <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Condición</p>
                    <p className="text-white/80 text-sm font-semibold mt-0.5">{data.carta.condicion.descripcion}</p>
                  </div>
                </div>

                {/* Categorías */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-3.5 h-3.5 text-white/30" />
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Categorías</p>
                  </div>
                  <div className="space-y-1.5">
                    {data.carta.categorias.map((categoria) => (
                      <div key={categoria.idCategoria} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-white/20" />
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                          style={{
                            background: `rgba(${glow.rgb},0.08)`,
                            borderColor: `rgba(${glow.rgb},0.20)`,
                            color: glow.hex,
                          }}
                        >
                          {categoria.descripcion}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Datos de la subasta */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 pt-1">
                  Información de la subasta
                </p>

                {/* Fechas */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[9px] text-white/25 uppercase tracking-widest font-semibold">Inicio</p>
                      <p className="text-white/70 text-xs font-medium mt-0.5">{data.fechaInicio}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                      <Globe className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-[9px] text-white/25 uppercase tracking-widest font-semibold">Cierre</p>
                      <p className="text-white/70 text-xs font-medium mt-0.5">{data.fechaCierre}</p>
                    </div>
                  </div>
                </div>

                {/* Creador */}
                {data.creador && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Creador</p>
                      <p className="text-white/80 text-sm font-semibold mt-0.5">{data.creador?.nombre ?? "—"}</p>
                    </div>
                  </div>
                )}
              </div>

            </CardContent>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center border-t border-white/[0.06] px-8 py-4 relative z-10 bg-white/[0.02]">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-white/30 hover:text-white/70 flex items-center gap-2 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Regresar</span>
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`/puja/table/${data.idSubasta}`}>
                    <Button
                      size="icon"
                      className="h-11 w-11 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg shadow-yellow-400/25 hover:scale-110 hover:shadow-yellow-400/40 transition-all duration-200"
                    >
                      <Info className="w-5 h-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Ver historial de pujas</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

        </div>
      </div>
    </div>
  );
}
