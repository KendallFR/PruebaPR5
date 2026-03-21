import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CartaService from '../../services/CartaService';
import { ErrorAlert } from "../ui/custom/ErrorAlert";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  ArrowLeft,
  History,
  ShieldCheck,
  CheckCircle,
  Calendar,
  User,
  Tag,
  Sparkles,
  FilmIcon,
} from "lucide-react";

import { LoadingGrid } from '../ui/custom/LoadingGrid';
import { EmptyState } from '../ui/custom/EmptyState';

/* ── Color dinámico por categoría ── */
function getGlowColor(categorias) {
  if (!categorias?.length) return { hex: "#3b82f6", rgb: "59,130,246" };
  const cat = categorias[0].descripcion.toLowerCase();
  if (cat.includes("electrico")) return { hex: "#facc15", rgb: "250,204,21" };
  if (cat.includes("fuego"))     return { hex: "#ef4444", rgb: "239,68,68" };
  if (cat.includes("agua"))      return { hex: "#3b82f6", rgb: "59,130,246" };
  if (cat.includes("planta"))    return { hex: "#22c55e", rgb: "34,197,94" };
  if (cat.includes("psiquico"))  return { hex: "#a855f7", rgb: "168,85,247" };
  if (cat.includes("pokemon"))   return { hex: "#a855f7", rgb: "168,85,247" };
  if (cat.includes("entrenador"))return { hex: "#f97316", rgb: "249,115,22" };
  return { hex: "#94a3b8", rgb: "148,163,184" };
}

export function DetailCarta() {
  const navigate = useNavigate();
  const { id }   = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL + 'uploads';

  const [carta,   setData]   = useState(null);
  const [error,   setError]  = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CartaService.getCartaById(id);
        setData(response.data);
        if (!response.data.success) setError(response.data.message);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingGrid count={1} type="grid" />;
  if (error)   return <ErrorAlert title="Error al cargar cartas" message={error} />;
  if (!carta || carta.data.length === 0)
    return <EmptyState message="No se encontraron cartas." />;

  const c     = carta.data;
  const glow  = getGlowColor(c.categorias);
  const isAvailable = c.estadoCarta?.descripcion?.toLowerCase().includes("disponible");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1e] to-[#020617] px-4 py-10">

      {/* Blobs decorativos con color dinámico */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: glow.hex }}
        />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-5"
          style={{ background: glow.hex }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* BACK */}
        <div className="mb-7">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white/40 hover:text-white/80 flex items-center gap-2 pl-0 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver al listado</span>
          </Button>
        </div>

        {/* LAYOUT PRINCIPAL */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── COLUMNA IZQUIERDA — imágenes estilo TCG ── */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-4">

            {/* Imagen principal — borde TCG */}
            {c.imagenes?.length > 0 ? (
              <>
                {/* Primera imagen grande */}
                <div
                  className="
                    relative w-64 h-[360px]
                    rounded-[18px] overflow-hidden
                    border-[3px]
                    shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.20)]
                    ring-1 ring-black/50
                    bg-[#0a0f1e]
                    transition-all duration-500
                    hover:scale-[1.02]
                  "
                  style={{
                    borderColor: `rgba(${glow.rgb}, 0.5)`,
                    boxShadow: `
                      0 20px 60px rgba(0,0,0,0.8),
                      0 0 40px rgba(${glow.rgb}, 0.15),
                      inset 0 1px 0 rgba(255,255,255,0.15)
                    `,
                  }}
                >
                  <img
                    src={`${BASE_URL}/${c.imagenes[0].imagen}`}
                    alt={c.nombre}
                    className="w-full h-full object-cover"
                  />
                  {/* Reflejo superior */}
                  <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
                  {/* Brillo holográfico */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, rgba(${glow.rgb},0.08) 0%, transparent 50%, rgba(${glow.rgb},0.04) 100%)`
                    }}
                  />
                  {/* Sombra inferior */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                  {/* Badge nombre en la carta */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                    <div className="bg-black/70 backdrop-blur-sm text-white/80 text-[10px] font-bold px-3 py-1 rounded-full border border-white/10">
                      {c.nombre}
                    </div>
                  </div>
                </div>

                {/* Imágenes adicionales en fila */}
                {c.imagenes.length > 1 && (
                  <div className="flex gap-3 flex-wrap justify-center">
                    {c.imagenes.slice(1).map((img, i) => (
                      <div
                        key={img.idImagen}
                        className="
                          relative w-20 h-28
                          rounded-[10px] overflow-hidden
                          border-2 border-white/20
                          shadow-lg shadow-black/50
                          bg-[#0a0f1e]
                          transition-all duration-200
                          hover:scale-110 hover:border-white/40
                          cursor-pointer
                        "
                      >
                        <img
                          src={`${BASE_URL}/${img.imagen}`}
                          alt={`${c.nombre}-${i + 2}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 bg-black/70 text-white/50 text-[8px] font-bold px-1 py-0.5 rounded-full">
                          {i + 2}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div
                className="
                  w-64 h-[360px] rounded-[18px]
                  border-2 border-white/10
                  bg-[#0a0f1e]
                  flex items-center justify-center
                  text-white/15
                "
              >
                <FilmIcon className="w-16 h-16" />
              </div>
            )}

          </div>

          {/* ── COLUMNA DERECHA — detalles ── */}
          <div className="flex-1 space-y-4">

            {/* Nombre + descripcion */}
            <div
              className="
                relative overflow-hidden
                rounded-3xl p-7
                border border-white/[0.07]
                bg-[#0d1424]/90 backdrop-blur-xl
              "
              style={{
                boxShadow: `0 0 40px rgba(${glow.rgb}, 0.05), inset 0 1px 0 rgba(255,255,255,0.05)`
              }}
            >
              {/* Barra superior */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, rgba(${glow.rgb},0.6), transparent)` }}
              />
              {/* Glow interior */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-20"
                style={{ background: glow.hex }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center border"
                      style={{
                        background: `rgba(${glow.rgb}, 0.12)`,
                        borderColor: `rgba(${glow.rgb}, 0.25)`,
                      }}
                    >
                      <Sparkles className="w-5 h-5" style={{ color: glow.hex }} />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tight">{c.nombre}</h1>
                  </div>
                  <span className={`
                    px-2.5 py-1 rounded-xl text-[11px] font-bold border shrink-0 flex items-center gap-1.5
                    ${isAvailable
                      ? "bg-green-500/10 text-green-300 border-green-500/20"
                      : "bg-red-500/10 text-red-300 border-red-500/20"
                    }
                  `}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                    {c.estadoCarta.descripcion}
                  </span>
                </div>

                {c.descripcion && (
                  <p className="text-white/40 text-sm leading-relaxed pl-14">
                    {c.descripcion}
                  </p>
                )}
              </div>
            </div>

            {/* Grid de info */}
            <div className="grid grid-cols-2 gap-3">

              {/* Condición */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0d1424]/80 border border-white/[0.06] hover:bg-white/[0.04] transition-colors duration-200 backdrop-blur-xl">
                <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Condición</p>
                  <p className="text-white/80 text-sm font-semibold mt-0.5">{c.condicion.descripcion}</p>
                </div>
              </div>

              {/* Disponibilidad */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0d1424]/80 border border-white/[0.06] hover:bg-white/[0.04] transition-colors duration-200 backdrop-blur-xl">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Estado</p>
                  <p className="text-white/80 text-sm font-semibold mt-0.5">{c.estadoCarta.descripcion}</p>
                </div>
              </div>

              {/* Fecha */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0d1424]/80 border border-white/[0.06] hover:bg-white/[0.04] transition-colors duration-200 backdrop-blur-xl">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Registrado</p>
                  <p className="text-white/80 text-sm font-semibold mt-0.5">{c.fechaRegistro}</p>
                </div>
              </div>

              {/* Propietario */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0d1424]/80 border border-white/[0.06] hover:bg-white/[0.04] transition-colors duration-200 backdrop-blur-xl">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Propietario</p>
                  <p className="text-white/80 text-sm font-semibold mt-0.5">{c.propietario.nombre}</p>
                </div>
              </div>

            </div>

            {/* Categorías */}
            <div className="p-5 rounded-2xl bg-[#0d1424]/80 border border-white/[0.06] backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-3.5 h-3.5 text-white/30" />
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Categorías</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.categorias.map((categoria) => (
                  <span
                    key={categoria.idCategoria}
                    className="px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-200 hover:scale-105"
                    style={{
                      background: `rgba(${glow.rgb}, 0.10)`,
                      borderColor: `rgba(${glow.rgb}, 0.25)`,
                      color: glow.hex,
                      boxShadow: `0 0 12px rgba(${glow.rgb}, 0.1)`,
                    }}
                  >
                    {categoria.descripcion}
                  </span>
                ))}
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-1">
              <Button
                onClick={() => navigate(`/carta/${id}/subastas`)}
                className="
                  flex-1 rounded-2xl h-12
                  bg-gradient-to-r from-yellow-400 to-yellow-300
                  hover:from-yellow-300 hover:to-yellow-200
                  text-black font-bold text-sm
                  shadow-lg shadow-yellow-400/25
                  hover:shadow-yellow-400/40 hover:scale-[1.02]
                  transition-all duration-200
                  flex items-center justify-center gap-2
                "
              >
                <History className="w-4 h-4" />
                Historial de Subastas
              </Button>

              <Button
                onClick={() => navigate(-1)}
                className="
                  flex-1 rounded-2xl h-12
                  bg-white/[0.04] hover:bg-white/[0.08]
                  border border-white/[0.08] hover:border-white/15
                  text-white/50 hover:text-white/80
                  text-sm transition-all duration-200
                  flex items-center justify-center gap-2
                "
              >
                <ArrowLeft className="w-4 h-4" />
                Regresar
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
