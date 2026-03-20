import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Globe,
  Info,
  FilmIcon,
  User,
  Zap,
  Sparkles,
  Pencil,
  Trash2,
  Gavel,
  Plus,
  X,
  Save,
  AlertTriangle,
  BadgeCheck,
  ToggleLeft,
  ToggleRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CartaService from "../../services/CartaService";
import toast from "react-hot-toast";

ListCardCartas.propTypes = {
  data: PropTypes.array,
  onRefresh: PropTypes.func,
};

/* ── ESTILOS POR TIPO ── */
const getTypeStyles = (categorias) => {
  if (!categorias || categorias.length === 0) {
    return {
      glow: "hover:shadow-white/40",
      ring: "group-hover:ring-white/50",
      badge: "bg-white/20 text-white",
      gradient: "from-white/10 via-white/5 to-transparent",
    };
  }
  const tipo = categorias[0].descripcion.toLowerCase();
  switch (tipo) {
    case "electrico":
      return {
        glow: "hover:shadow-yellow-400/80 hover:border-yellow-400/80",
        ring: "group-hover:ring-yellow-400/70",
        badge: "bg-yellow-400/20 text-yellow-300",
        gradient: "from-yellow-400/30 via-yellow-300/10 to-transparent",
      };
    case "fuego":
      return {
        glow: "hover:shadow-red-500/80 hover:border-red-500/80",
        ring: "group-hover:ring-red-500/70",
        badge: "bg-red-500/20 text-red-300",
        gradient: "from-red-500/30 via-red-400/10 to-transparent",
      };
    case "agua":
      return {
        glow: "hover:shadow-blue-500/80 hover:border-blue-500/80",
        ring: "group-hover:ring-blue-500/70",
        badge: "bg-blue-500/20 text-blue-300",
        gradient: "from-blue-500/30 via-blue-400/10 to-transparent",
      };
    case "pokemon":
      return {
        glow: "hover:shadow-purple-400/80 hover:border-purple-400/80",
        ring: "group-hover:ring-purple-400/70",
        badge: "bg-purple-400/20 text-purple-300",
        gradient: "from-purple-400/30 via-purple-300/10 to-transparent",
      };
    case "entrenador":
      return {
        glow: "hover:shadow-orange-400/80 hover:border-orange-400/80",
        ring: "group-hover:ring-orange-400/70",
        badge: "bg-orange-400/20 text-orange-300",
        gradient: "from-orange-400/30 via-orange-300/10 to-transparent",
      };
    case "objeto":
      return {
        glow: "hover:shadow-slate-300/40 hover:border-slate-300/40",
        ring: "group-hover:ring-slate-300/40",
        badge: "bg-white/20 text-white",
        gradient: "from-slate-300/15 via-slate-200/5 to-transparent",
      };
    default:
      return {
        glow: "hover:shadow-yellow-400/80",
        ring: "group-hover:ring-yellow-400/70",
        badge: "bg-yellow-400/20 text-yellow-300",
        gradient: "from-yellow-400/30 via-yellow-300/10 to-transparent",
      };
  }
};

const CONDICIONES_OPCIONES = [
  { id: 1, descripcion: "Nuevo" },
  { id: 2, descripcion: "Usado" },
  { id: 3, descripcion: "Dañado" },
];

const ESTADOS_OPCIONES = [
  { id: 1, descripcion: "Disponible" },
  { id: 2, descripcion: "No disponible" },
  { id: 3, descripcion: "En subasta" },
];

/* ══════════════════════════════════════
   MODAL EDITAR
══════════════════════════════════════ */
function EditModal({ item, onClose, onSaved }) {
  const [form, setForm] = useState({
    nombre:        item.nombre        ?? "",
    descripcion:   item.descripcion   ?? "",
    condicionId:   String(item.condicion?.idCondicion  ?? item.condicionId  ?? ""),
    estadoCartaId: String(item.estadoCarta?.idEstadoCarta ?? item.estadoCartaId ?? ""),
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.nombre) {
      toast.error("El nombre es obligatorio");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nombre",        form.nombre);
      formData.append("descripcion",   form.descripcion);
      formData.append("idCondicion",   form.condicionId);
      formData.append("idEstadoCarta", form.estadoCartaId);

      await CartaService.updateCarta(item.idCarta, formData);
      toast.success("Carta actualizada correctamente");
      onSaved();
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar la carta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="
        w-full max-w-lg
        bg-[#0d1424]/95 border border-white/10
        rounded-2xl shadow-2xl shadow-black/60
        overflow-hidden
        animate-in fade-in zoom-in-95 duration-200
      ">
        {/* Header modal */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <Pencil className="w-4 h-4 text-blue-400" />
            <h3 className="text-white font-bold text-lg">Editar Carta</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body modal */}
        <div className="px-6 py-5 space-y-4">

          {/* Nombre */}
          <div className="space-y-1.5">
            <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <BadgeCheck className="w-3.5 h-3.5 text-yellow-400" />
              Nombre <span className="text-red-400">*</span>
            </Label>
            <Input
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className="!bg-white/[0.04] border-white/10 !text-white placeholder:text-white/20 focus:border-yellow-400/50 rounded-xl h-10 text-sm"
            />
          </div>

          {/* Descripción */}
          <div className="space-y-1.5">
            <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest">
              Descripción
            </Label>
            <textarea
              value={form.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              rows={3}
              placeholder="Descripción de la carta..."
              className="w-full bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 focus:border-purple-400/40 focus:outline-none focus:ring-1 focus:ring-purple-400/15 rounded-xl resize-none text-sm px-3 py-2.5 transition-colors"
            />
          </div>

          {/* Condición + Estado */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest">
                Condición
              </Label>
              <Select value={form.condicionId} onValueChange={(v) => handleChange("condicionId", v)}>
                <SelectTrigger className="!bg-white/[0.04] border-white/10 !text-white rounded-xl h-10 text-sm [&>span]:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="!bg-[#0c1320] border border-white/10 z-[60]">
                  {CONDICIONES_OPCIONES.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}
                      className="!text-white/80 hover:!bg-white/8 focus:!bg-white/8 focus:!text-white cursor-pointer text-sm">
                      {c.descripcion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest">
                Estado
              </Label>
              <Select value={form.estadoCartaId} onValueChange={(v) => handleChange("estadoCartaId", v)}>
                <SelectTrigger className="!bg-white/[0.04] border-white/10 !text-white rounded-xl h-10 text-sm [&>span]:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="!bg-[#0c1320] border border-white/10 z-[60]">
                  {ESTADOS_OPCIONES.map((e) => (
                    <SelectItem key={e.id} value={String(e.id)}
                      className="!text-white/80 hover:!bg-white/8 focus:!bg-white/8 focus:!text-white cursor-pointer text-sm">
                      {e.descripcion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Footer modal */}
        <div className="flex gap-3 px-6 pb-6">
          <Button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 bg-transparent text-white/50 hover:text-white hover:bg-white/5 text-sm"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={handleSave}
            className="flex-1 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <Save className="w-4 h-4" />
            }
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MODAL CONFIRMAR BORRADO LÓGICO
══════════════════════════════════════ */
function DeleteModal({ item, onClose, onConfirmed }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("idEstadoCarta", 2);
      await CartaService.updateCarta(item.idCarta, formData);
      toast.success(`"${item.nombre}" desactivada correctamente`);
      onConfirmed();
    } catch (err) {
      console.error(err);
      toast.error("Error al desactivar la carta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="
        w-full max-w-sm
        bg-[#0d1424]/95 border border-red-500/20
        rounded-2xl shadow-2xl shadow-black/60
        overflow-hidden
        animate-in fade-in zoom-in-95 duration-200
      ">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="text-white font-bold text-lg">Desactivar Carta</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-white/60 text-sm leading-relaxed">
            ¿Estás seguro de que deseas desactivar la carta{" "}
            <span className="text-white font-semibold">"{item.nombre}"</span>?
          </p>
          <p className="text-white/35 text-xs mt-2">
            El estado cambiará a <span className="text-red-300 font-semibold">No disponible</span>. Podrás reactivarla con el botón de toggle.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <Button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 bg-transparent text-white/50 hover:text-white hover:bg-white/5 text-sm"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="flex-1 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-sm shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <Trash2 className="w-4 h-4" />
            }
            {loading ? "Desactivando..." : "Desactivar"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CARRUSEL DE IMÁGENES ESTILO CARTA TCG
══════════════════════════════════════ */
function CardImageCarousel({ imagenes, nombre, BASE_URL }) {
  const [current, setCurrent] = useState(0);
  const total = imagenes?.length ?? 0;

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + total) % total);
  };
  const next = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % total);
  };

  return (
    <div className="flex justify-center px-4 py-4">
      <div className="
        relative w-56 h-80
        rounded-[14px] overflow-hidden
        border-[3px] border-white/30
        shadow-[0_10px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.18)]
        ring-1 ring-black/50
        bg-[#0a0f1e]
        transition-all duration-300
        group-hover:border-white/50
        group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.25)]
      ">
        {total > 0 ? (
          <>
            <img
              src={`${BASE_URL}/${imagenes[current].imagen}`}
              alt={`${nombre}-${current}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute top-0 left-0 right-0 h-[25%] bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/10 via-transparent to-white/5 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

            {total > 1 && (
              <>
                <button onClick={prev} className="
                  absolute left-2 top-1/2 -translate-y-1/2
                  w-7 h-7 rounded-full bg-black/60 hover:bg-black/90
                  backdrop-blur-sm flex items-center justify-center
                  text-white/70 hover:text-white
                  border border-white/15 hover:border-white/40
                  transition-all duration-150 z-10
                  opacity-0 group-hover:opacity-100
                ">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button onClick={next} className="
                  absolute right-2 top-1/2 -translate-y-1/2
                  w-7 h-7 rounded-full bg-black/60 hover:bg-black/90
                  backdrop-blur-sm flex items-center justify-center
                  text-white/70 hover:text-white
                  border border-white/15 hover:border-white/40
                  transition-all duration-150 z-10
                  opacity-0 group-hover:opacity-100
                ">
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                  {imagenes.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                      className={`rounded-full transition-all duration-200 ${
                        i === current ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute top-2 right-2 bg-black/60 text-white/70 text-[9px] font-bold px-1.5 py-0.5 rounded-full backdrop-blur-sm z-10">
                  {current + 1}/{total}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/15">
            <FilmIcon className="w-12 h-12" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════ */
export function ListCardCartas({ data, onRefresh }) {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  const [editItem,   setEditItem]   = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const handleSubasta = (item) => {
    navigate("/subasta/create", { state: { carta: item } });
  };

  const handleToggleEstado = async (item) => {
    const isInactive = item.estadoCarta?.descripcion?.toLowerCase().includes("no disponible");
    const nuevoEstado = isInactive ? 1 : 2;
    try {
      const formData = new FormData();
      formData.append("idEstadoCarta", nuevoEstado);
      await CartaService.updateCarta(item.idCarta, formData);
      toast.success(isInactive ? `"${item.nombre}" activada` : `"${item.nombre}" desactivada`);
      onRefresh?.();
    } catch (err) {
      console.error(err);
      toast.error("Error al cambiar el estado");
    }
  };

  const handleEditSaved = () => {
    setEditItem(null);
    onRefresh?.();
  };

  const handleDeleteConfirmed = () => {
    setDeleteItem(null);
    onRefresh?.();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h1 className="text-2xl font-bold text-white/90 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Mis Cartas
          </h1>
          <Link to="/carta/crear">
            <Button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full px-5 py-2 shadow-lg shadow-yellow-400/30 hover:scale-105 transition-all duration-200">
              <Plus className="w-4 h-4" />
              Nueva Carta
            </Button>
          </Link>
        </div>

        {/* GRID */}
        <div className="grid gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {data && data.map((item) => {
            const typeStyles = getTypeStyles(item.categorias);
            const isInactive = item.estadoCarta?.descripcion?.toLowerCase().includes("no disponible");

            return (
              <Card
                key={item.idCarta}
                className={`
                  group relative overflow-hidden
                  border border-white/10 bg-white/10
                  backdrop-blur-xl shadow-xl
                  transition-all duration-300 hover:-translate-y-2
                  rounded-2xl
                  ${isInactive ? "opacity-60 grayscale-[40%]" : ""}
                  ${typeStyles.glow}
                `}
              >
                {/* Efectos hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br ${typeStyles.gradient} pointer-events-none`} />
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none ring-2 ${typeStyles.ring} blur-[2px]`} />

                {/* Badge inactiva */}
                {isInactive && (
                  <div className="absolute top-3 right-3 z-20 bg-red-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Inactiva
                  </div>
                )}

                {/* HEADER */}
                <CardHeader className="text-center pb-2 relative z-10">
                  <CardTitle className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {item.nombre}
                  </CardTitle>
                  <p className="text-sm text-white/70">{item.condicion.descripcion}</p>
                </CardHeader>

                {/* IMAGEN */}
                <CardImageCarousel
                  imagenes={item.imagenes}
                  nombre={item.nombre}
                  BASE_URL={BASE_URL}
                />

                {/* CONTENT */}
                <CardContent className="space-y-4 pt-4 text-white relative z-10">

                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <User className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Propietario</p>
                      <p className="font-semibold">{item.propietario.nombre}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500/20 p-2 rounded-lg">
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Categorías</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.categorias?.map((categoria, index) => (
                          <span key={index} className={`px-2 py-1 text-xs font-semibold rounded-full ${typeStyles.badge}`}>
                            {categoria.descripcion}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <Globe className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Disponibilidad</p>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        isInactive
                          ? "bg-red-500/20 text-red-300"
                          : "bg-green-400/20 text-green-300"
                      }`}>
                        {item.estadoCarta.descripcion}
                      </span>
                    </div>
                  </div>

                </CardContent>

                {/* BOTONES */}
                <div className="flex justify-between items-center border-t border-white/10 p-3 relative z-10 bg-white/5 backdrop-blur-md">

                  <div className="flex gap-2">
                    <TooltipProvider>

                      {/* ── Editar — deshabilitado si inactiva ── */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => setEditItem(item)}
                            disabled={isInactive}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/80 border border-white/20 text-white/70 hover:text-white shadow hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {isInactive ? "Activa la carta para editar" : "Editar"}
                        </TooltipContent>
                      </Tooltip>

                      {/* ── Borrado lógico — deshabilitado si ya inactiva ── */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => setDeleteItem(item)}
                            disabled={isInactive}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/80 border border-white/20 text-white/70 hover:text-white shadow hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {isInactive ? "Ya está desactivada" : "Desactivar"}
                        </TooltipContent>
                      </Tooltip>

                      {/* ── Toggle activar/desactivar — siempre activo ── */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => handleToggleEstado(item)}
                            className={`
                              w-8 h-8 rounded-full border shadow
                              hover:scale-110 transition-all duration-200
                              ${isInactive
                                ? "bg-green-500/20 hover:bg-green-500/80 border-green-500/40 text-green-400 hover:text-white"
                                : "bg-orange-500/20 hover:bg-orange-500/80 border-orange-500/40 text-orange-400 hover:text-white"
                              }
                            `}
                          >
                            {isInactive
                              ? <ToggleLeft  className="w-3.5 h-3.5" />
                              : <ToggleRight className="w-3.5 h-3.5" />
                            }
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {isInactive ? "Activar carta" : "Desactivar carta"}
                        </TooltipContent>
                      </Tooltip>

                      {/* ── Crear subasta — deshabilitado si inactiva ── */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => handleSubasta(item)}
                            disabled={isInactive}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-yellow-500/80 border border-white/20 text-white/70 hover:text-white shadow hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Gavel className="w-3.5 h-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {isInactive ? "Activa la carta para subastar" : "Crear subasta"}
                        </TooltipContent>
                      </Tooltip>

                    </TooltipProvider>
                  </div>

                  {/* Detalle — siempre activo */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to={`/carta/detail/${item.idCarta}`}>
                          <Button size="icon" className="rounded-full bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg hover:scale-110 transition">
                            <Info className="w-4 h-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Detalle</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* MODALES */}
      {editItem && (
        <EditModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSaved={handleEditSaved}
        />
      )}
      {deleteItem && (
        <DeleteModal
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
          onConfirmed={handleDeleteConfirmed}
        />
      )}
    </>
  );
}
