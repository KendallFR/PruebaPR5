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
  Sparkles,
  ImagePlus,
  X,
  Save,
  ArrowLeft,
  Zap,
  Globe,
  BadgeCheck,
  FileText,
  Bolt,
  Flame,
  Droplets,
  Leaf,
  Box,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

/* ── Opciones ── */
const CATEGORIAS_OPCIONES = [
  {
    id: 1,
    descripcion: "Electrico",
    icon: Bolt,
    colors: {
      idle:   "bg-yellow-400/10 border-yellow-400/30 text-yellow-400/60",
      active: "bg-yellow-400/25 border-yellow-400 text-yellow-300 shadow-yellow-400/40",
      glow:   "shadow-yellow-400/50 border-yellow-400/60",
      gradient: "from-yellow-400/20 via-yellow-300/5 to-transparent",
      dot:    "bg-yellow-400",
    },
  },
  {
    id: 2,
    descripcion: "Fuego",
    icon: Flame,
    colors: {
      idle:   "bg-red-500/10 border-red-500/30 text-red-400/60",
      active: "bg-red-500/25 border-red-500 text-red-300 shadow-red-500/40",
      glow:   "shadow-red-500/50 border-red-500/60",
      gradient: "from-red-500/20 via-red-400/5 to-transparent",
      dot:    "bg-red-500",
    },
  },
  {
    id: 3,
    descripcion: "Agua",
    icon: Droplets,
    colors: {
      idle:   "bg-blue-500/10 border-blue-500/30 text-blue-400/60",
      active: "bg-blue-500/25 border-blue-500 text-blue-300 shadow-blue-500/40",
      glow:   "shadow-blue-500/50 border-blue-500/60",
      gradient: "from-blue-500/20 via-blue-400/5 to-transparent",
      dot:    "bg-blue-400",
    },
  },
  {
    id: 4,
    descripcion: "Planta",
    icon: Leaf,
    colors: {
      idle:   "bg-green-500/10 border-green-500/30 text-green-400/60",
      active: "bg-green-500/25 border-green-500 text-green-300 shadow-green-500/40",
      glow:   "shadow-green-500/50 border-green-500/60",
      gradient: "from-green-500/20 via-green-400/5 to-transparent",
      dot:    "bg-green-400",
    },
  },
  {
    id: 5,
    descripcion: "Objeto",
    icon: Box,
    colors: {
      idle:   "bg-slate-400/10 border-slate-400/30 text-slate-300/60",
      active: "bg-slate-200/20 border-slate-200 text-white shadow-slate-300/30",
      glow:   "shadow-slate-300/40 border-slate-300/50",
      gradient: "from-slate-300/15 via-slate-200/5 to-transparent",
      dot:    "bg-slate-300",
    },
  },
];

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

const getActiveCat = (selectedIds) =>
  CATEGORIAS_OPCIONES.find((c) => selectedIds.includes(String(c.id)));

export default function CreateCarta() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre:        "",
    descripcion:   "",
    condicionId:   "",
    estadoCartaId: "",
    categorias:    [],
    imagenes:      [],
    previews:      [],
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const activeCat  = getActiveCat(form.categorias);
  const activeGlow = activeCat
    ? `shadow-2xl ${activeCat.colors.glow}`
    : "shadow-2xl border-white/10";
  const activeGradient = activeCat
    ? `bg-gradient-to-br ${activeCat.colors.gradient}`
    : "bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent";

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleCategoria = (id) =>
    setForm((prev) => ({
      ...prev,
      categorias: prev.categorias.includes(id)
        ? prev.categorias.filter((c) => c !== id)
        : [...prev.categorias, id],
    }));

  const handleImages = (e) => {
    const files    = Array.from(e.target.files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setForm((prev) => ({
      ...prev,
      imagenes: [...prev.imagenes, ...files],
      previews: [...prev.previews, ...previews],
    }));
  };

  const removeImage = (index) =>
    setForm((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
      previews: prev.previews.filter((_, i) => i !== index),
    }));

  const handleSubmit = async () => {
    if (!form.nombre || !form.condicionId || !form.estadoCartaId) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const formData = new FormData();
      formData.append("nombre",        form.nombre);
      formData.append("descripcion",   form.descripcion);
      formData.append("condicionId",   form.condicionId);
      formData.append("estadoCartaId", form.estadoCartaId);
      form.categorias.forEach((id) => formData.append("categorias[]", id));
      form.imagenes.forEach((img)   => formData.append("imagenes", img));
      const res = await fetch(`${BASE_URL}carta`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Error al crear la carta.");
      navigate("/carta");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] flex flex-col items-center py-10 px-4">

      {/* BACK */}
      <div className="w-full max-w-2xl mb-5">
        <Link to="/carta">
          <Button variant="ghost" className="text-white/40 hover:text-white flex items-center gap-2 pl-0 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver al listado
          </Button>
        </Link>
      </div>

      {/* FORMULARIO */}
      <Card className={`
        w-full max-w-2xl relative overflow-hidden
        border !bg-[#0d1424]/90 backdrop-blur-xl
        rounded-2xl transition-all duration-500
        ${activeGlow}
      `}>

        {/* Glow fondo dinámico */}
        <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${activeGradient}`} />

        {/* Barra top decorativa */}
        <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* HEADER */}
        <CardHeader className="relative z-10 text-center pb-2 pt-8 !bg-transparent">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <CardTitle className="text-2xl font-bold text-white tracking-tight">
              Nueva <span className="text-yellow-400">Carta</span>
            </CardTitle>
          </div>
          <p className="text-xs text-white/35 tracking-wide">
            Completa los campos para registrar tu carta en el sistema
          </p>
        </CardHeader>

        <CardContent className="relative z-10 space-y-5 px-7 pb-8 !bg-transparent">

          {/* NOMBRE */}
          <div className="space-y-1.5">
            <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <BadgeCheck className="w-3.5 h-3.5 text-yellow-400" />
              Nombre <span className="text-red-400">*</span>
            </Label>
            <Input
              placeholder="Ej. Pikachu Edición Oro"
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className="!bg-white/[0.04] border-white/10 !text-white placeholder:text-white/20 focus:border-yellow-400/50 focus:!ring-1 focus:ring-yellow-400/15 rounded-xl h-11 text-sm"
            />
          </div>

          {/* CONDICIÓN + ESTADO en fila */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />
                Condición <span className="text-red-400">*</span>
              </Label>
              <Select onValueChange={(v) => handleChange("condicionId", v)}>
                <SelectTrigger className="!bg-white/[0.04] border-white/10 !text-white rounded-xl h-11 text-sm [&>span]:text-white">
                  <SelectValue placeholder="Selecciona..." />
                </SelectTrigger>
                <SelectContent className="!bg-[#0c1320] border border-white/10 z-50">
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
              <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-green-400" />
                Estado <span className="text-red-400">*</span>
              </Label>
              <Select onValueChange={(v) => handleChange("estadoCartaId", v)}>
                <SelectTrigger className="!bg-white/[0.04] border-white/10 !text-white rounded-xl h-11 text-sm [&>span]:text-white">
                  <SelectValue placeholder="Selecciona..." />
                </SelectTrigger>
                <SelectContent className="!bg-[#0c1320] border border-white/10 z-50">
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

          {/* DESCRIPCIÓN */}
          <div className="space-y-1.5">
            <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              Descripción
            </Label>
            <textarea
              placeholder="Describe la carta: habilidades, rareza, estado físico, historia..."
              value={form.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 focus:border-purple-400/40 focus:outline-none focus:ring-1 focus:ring-purple-400/15 rounded-xl resize-none text-sm px-3 py-2.5 transition-colors"
            />
          </div>

          {/* CATEGORÍAS */}
          <div className="space-y-2">
            <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Categorías
            </Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS_OPCIONES.map((cat) => {
                const selected = form.categorias.includes(String(cat.id));
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategoria(String(cat.id))}
                    className={`
                      flex items-center gap-1.5
                      px-3.5 py-2 rounded-full text-xs font-bold
                      border-2 transition-all duration-200
                      ${selected
                        ? `${cat.colors.active} shadow-lg scale-105`
                        : `${cat.colors.idle} hover:opacity-75`
                      }
                    `}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.descripcion}
                    {selected && (
                      <span className={`w-1.5 h-1.5 rounded-full ${cat.colors.dot} animate-pulse`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* IMÁGENES */}
          <div className="space-y-2.5">
            <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <ImagePlus className="w-3.5 h-3.5 text-pink-400" />
              Imágenes de la carta
            </Label>

            {/* Previews estilo carta TCG */}
            {form.previews.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center py-3 px-2 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                {form.previews.map((src, i) => (
                  <div
                    key={i}
                    className="relative group/img flex-shrink-0"
                    style={{ width: "112px" }}
                  >
                    {/* Marco estilo carta */}
                    <div className="
                      w-28 h-40
                      rounded-[10px] overflow-hidden
                      border-2 border-white/25
                      shadow-2xl shadow-black/60
                      ring-1 ring-white/8
                      transition-all duration-200
                      group-hover/img:scale-105
                      group-hover/img:border-white/50
                      group-hover/img:shadow-black/80
                      bg-[#0a0f1e]
                    ">
                      <img
                        src={src}
                        alt={`preview-${i}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Brillo holográfico hover */}
                      <div className="
                        absolute inset-0
                        opacity-0 group-hover/img:opacity-100
                        bg-gradient-to-br from-white/10 via-transparent to-white/5
                        transition-opacity duration-300 pointer-events-none
                      " />
                    </div>

                    {/* Botón eliminar */}
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="
                        absolute -top-1.5 -right-1.5
                        w-5 h-5
                        bg-red-500 hover:bg-red-400
                        rounded-full shadow-lg
                        flex items-center justify-center
                        opacity-0 group-hover/img:opacity-100
                        transition-all duration-150
                        z-10
                      "
                    >
                      <X className="w-2.5 h-2.5 text-white" />
                    </button>

                    {/* Número */}
                    <div className="
                      absolute bottom-1 left-1/2 -translate-x-1/2
                      bg-black/70 text-white/50 text-[9px]
                      font-bold px-1.5 py-0.5 rounded-full
                    ">
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Zona upload */}
            <label className="
              flex flex-col items-center justify-center gap-1.5
              w-full h-[72px]
              border-2 border-dashed border-white/10
              rounded-xl cursor-pointer
              hover:border-pink-400/35 hover:bg-pink-400/[0.03]
              transition-all duration-200
              group/upload
            ">
              <ImagePlus className="w-4 h-4 text-white/25 group-hover/upload:text-pink-400/60 group-hover/upload:scale-110 transition-all" />
              <span className="text-[11px] text-white/25 group-hover/upload:text-white/50 transition-colors">
                Click para subir imágenes
              </span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
            </label>
          </div>

          {/* Separador */}
          <div className="h-px bg-white/[0.06] rounded-full" />

          {/* ERROR */}
          {error && (
            <div className="flex items-start gap-2 text-red-300 text-sm bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3">
              <X className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
              {error}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-3 pt-1">
            <Link to="/carta" className="flex-1">
              <Button
                type="button"
                variant="ghost"
                className="w-full rounded-xl border border-white/8 text-white/40 hover:text-white hover:bg-white/5 text-sm transition-all"
              >
                Cancelar
              </Button>
            </Link>

            <Button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="
                flex-1 rounded-xl
                bg-yellow-400 hover:bg-yellow-300
                text-black font-bold text-sm
                shadow-lg shadow-yellow-400/20
                hover:scale-[1.02] hover:shadow-yellow-400/35
                transition-all duration-200
                flex items-center justify-center gap-2
              "
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                : <Save className="w-4 h-4" />
              }
              {loading ? "Guardando..." : "Guardar Carta"}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
