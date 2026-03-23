import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft, Save, Sparkles, BadgeCheck, Globe, Zap, FileText,
  ImagePlus, X, ChevronLeft, ChevronRight, FilmIcon, Loader2,
} from "lucide-react";
import CartaService from "../../services/CartaService";
import CategoriasService from "@/services/CategoriasService";
import CondicionService from "../../services/CondicionService";
import EstadoCartaService from "@/services/EstadoCartaService";
import ImageService from "../../services/ImageService";
import toast from "react-hot-toast";

/* ── Colores por categoría — igual que CreateCarta ── */
const categoriaStyles = {
  Pokemon:    "bg-purple-400/20 border-purple-400 text-purple-300 shadow-purple-400/20",
  Objeto:     "bg-slate-400/20 border-slate-400 text-white shadow-slate-300/20",
  Entrenador: "bg-orange-400/20 border-orange-400 text-orange-300 shadow-orange-400/20",
  Electrico:  "bg-yellow-400/20 border-yellow-400 text-yellow-300 shadow-yellow-400/20",
  Fuego:      "bg-red-500/20 border-red-500 text-red-300 shadow-red-500/20",
  Agua:       "bg-blue-500/20 border-blue-500 text-blue-300 shadow-blue-500/20",
  Planta:     "bg-green-500/20 border-green-500 text-green-300 shadow-green-500/20",
};

const categoriaGlow = {
  Pokemon:    "shadow-purple-400/30 border-purple-400/30",
  Objeto:     "shadow-slate-300/20 border-slate-300/20",
  Entrenador: "shadow-orange-400/30 border-orange-400/30",
  Electrico:  "shadow-yellow-400/30 border-yellow-400/30",
  Fuego:      "shadow-red-500/30 border-red-500/30",
  Agua:       "shadow-blue-500/30 border-blue-500/30",
  Planta:     "shadow-green-500/30 border-green-500/30",
};

/* ══════════════════════════
   CARRUSEL IMÁGENES EXISTENTES
══════════════════════════ */
function ExistingImagesCarousel({ imagenes, BASE_URL, onRemove }) {
  const [cur, setCur] = useState(0);
  const total = imagenes.length;
  if (total === 0) return null;

  const prev = () => setCur((c) => (c - 1 + total) % total);
  const next = () => setCur((c) => (c + 1) % total);

  return (
    <div className="space-y-2">
      <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Imágenes actuales</p>
      <div className="relative flex justify-center group/car">
        <div className="relative w-44 h-60 rounded-[12px] overflow-hidden border-[2.5px] border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-black/40 bg-[#0a0f1e]">
          <img src={`${BASE_URL}/${imagenes[cur].imagen}`} alt={`img-${cur}`} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-0 group-hover/car:opacity-100 bg-gradient-to-br from-white/8 via-transparent to-white/4 transition-opacity duration-300 pointer-events-none" />

          <div className="absolute top-2 left-2 bg-black/60 text-white/60 text-[9px] font-bold px-1.5 py-0.5 rounded-full backdrop-blur-sm z-10">
            {cur + 1}/{total}
          </div>

          <button
            type="button"
            onClick={() => { onRemove(cur); setCur((c) => Math.max(0, c - 1)); }}
            className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center shadow-lg transition-all duration-150 opacity-0 group-hover/car:opacity-100"
          >
            <X className="w-3 h-3 text-white" />
          </button>

          {total > 1 && (
            <>
              <button onClick={prev} className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white/70 border border-white/15 transition-all opacity-0 group-hover/car:opacity-100">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button onClick={next} className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white/70 border border-white/15 transition-all opacity-0 group-hover/car:opacity-100">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
                {imagenes.map((_, i) => (
                  <button key={i} onClick={() => setCur(i)}
                    className={`rounded-full transition-all duration-200 ${i === cur ? "w-3.5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/35 hover:bg-white/60"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════
   EDIT CARTA PAGE
══════════════════════════ */
export default function EditCarta() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  const [loadingData, setLoadingData] = useState(true);
  const [saving,      setSaving]      = useState(false);
  const [error,       setError]       = useState(null);

  /* ── Datos del backend — igual que CreateCarta ── */
  const [categorias,  setCategorias]  = useState([]);
  const [condiciones, setCondiciones] = useState([]);
  const [estados,     setEstados]     = useState([]);

  /* ── Imágenes nuevas ── */
  const [filesNuevos,   setFilesNuevos]   = useState([]);
  const [previewNuevos, setPreviewNuevos] = useState([]);

  const [form, setForm] = useState({
    nombre:             "",
    descripcion:        "",
    idCondicion:        "",
    idEstadoCarta:      "",
    categorias:         [],
    imagenesExistentes: [],
    idUsuario:          1,
    fechaRegistro:      "",
  });

  /* ── Cargar todo del backend ── */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [catRes, condRes, estRes, cartaRes] = await Promise.all([
          CategoriasService.getCategorias(),
          CondicionService.getCondiciones(),
          EstadoCartaService.getEstadoCartas(),
          CartaService.getCartaById(id),
        ]);

        setCategorias(catRes.data?.data   ?? catRes.data  ?? []);
        setCondiciones(condRes.data?.data ?? condRes.data ?? []);
        setEstados(estRes.data?.data      ?? estRes.data  ?? []);

        const data = cartaRes.data?.data ?? cartaRes.data;

        setForm({
          nombre:             data.nombre      ?? "",
          descripcion:        data.descripcion ?? "",
          idCondicion:        data.idCondicion   ?? data.condicion?.idCondicion   ?? "",
          idEstadoCarta:      data.idEstadoCarta ?? data.estadoCarta?.idEstadoCarta ?? "",
          categorias:         (data.categorias ?? []).map((c) => c.idCategoria ?? c.id),
          imagenesExistentes: data.imagenes ?? [],
          idUsuario:          data.idUsuario ?? data.propietario?.idUsuario ?? 1,
          fechaRegistro:      data.fechaRegistro ?? "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Error al cargar los datos");
      } finally {
        setLoadingData(false);
      }
    };
    fetchAll();
  }, [id]);

  /* ── Glow dinámico — igual que CreateCarta ── */
  const firstCat  = categorias.find((c) => form.categorias.includes(c.idCategoria));
  const glowClass = firstCat ? (categoriaGlow[firstCat.descripcion] ?? "border-white/[0.07]") : "border-white/[0.07]";

  /* ── Handlers ── */
  const handleChange = (field, value) =>
    setForm((p) => ({ ...p, [field]: value }));

  const toggleCategoria = (idCategoria) =>
    setForm((p) => ({
      ...p,
      categorias: p.categorias.includes(idCategoria)
        ? p.categorias.filter((c) => c !== idCategoria)
        : [...p.categorias, idCategoria],
    }));

  const handleNuevasImagenes = (e) => {
    const files    = Array.from(e.target.files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setFilesNuevos((prev)   => [...prev, ...files]);
    setPreviewNuevos((prev) => [...prev, ...previews]);
  };

  const removeNueva = (i) => {
    setFilesNuevos((prev)   => prev.filter((_, idx) => idx !== i));
    setPreviewNuevos((prev) => prev.filter((_, idx) => idx !== i));
  };

  const removeExistente = async (i) => {
    const img = form.imagenesExistentes[i];
    try {
      // El id de la imagen viene del backend como img.id o img.idImagen
      const idImagen = img.id ?? img.idImagen;
      await ImageService.deleteImage(idImagen);
      setForm((p) => ({
        ...p,
        imagenesExistentes: p.imagenesExistentes.filter((_, idx) => idx !== i),
      }));
      toast.success("Imagen eliminada");
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar la imagen");
    }
  };

  /* ── Submit ── */
  const handleSubmit = async () => {
    if (!form.nombre || !form.idCondicion || !form.idEstadoCarta) {
      setError("Nombre, condición y estado son obligatorios.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const fechaMySQL = form.fechaRegistro
        ? form.fechaRegistro.slice(0, 19).replace("T", " ")
        : new Date().toISOString().slice(0, 19).replace("T", " ");

      // 1. Actualizar datos de la carta
      await CartaService.updateCarta({
        idCarta:       Number(id),
        nombre:        form.nombre,
        descripcion:   form.descripcion ?? "",
        idCondicion:   Number(form.idCondicion),
        idEstadoCarta: Number(form.idEstadoCarta),
        idUsuario:     Number(form.idUsuario ?? 1),
        fechaRegistro: fechaMySQL,
        categorias:    form.categorias.map(Number),
      });

      // 2. Subir imágenes nuevas si hay
      if (filesNuevos.length > 0) {
        for (const file of filesNuevos) {
          const formData = new FormData();
          formData.append("file",    file);
          formData.append("idCarta", id);
          await ImageService.createImage(formData);
        }
      }

      toast.success("Carta actualizada correctamente ✨");
      navigate("/carta");
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar la carta");
      const errData = err?.response?.data;
      setError(typeof errData === "string" ? errData : errData?.message ?? errData?.result ?? "Error al actualizar.");
    } finally {
      setSaving(false);
    }
  };

  /* ── Loading ── */
  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-yellow-400/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-yellow-400 animate-spin" />
            <Sparkles className="absolute inset-0 m-auto w-5 h-5 text-yellow-400/60" />
          </div>
          <p className="text-white/30 text-sm tracking-widest uppercase">Cargando carta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1e] to-[#020617] flex flex-col items-center py-10 px-4">

      {/* Partículas fondo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* BACK */}
      <div className="w-full max-w-3xl mb-6 relative z-10">
        <Link to="/carta">
          <Button variant="ghost" className="text-white/40 hover:text-white/80 flex items-center gap-2 pl-0 transition-all duration-200">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver al listado</span>
          </Button>
        </Link>
      </div>

      {/* CARD PRINCIPAL */}
      <Card className={`
        w-full max-w-3xl relative overflow-hidden
        border !bg-[#0d1424]/95 backdrop-blur-xl
        rounded-3xl transition-all duration-700
        shadow-2xl ${glowClass}
      `}>

        {/* Barra superior */}
        <div className="absolute top-0 left-0 right-0 h-[2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
        </div>

        {/* Glow interno */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* HEADER */}
        <CardHeader className="relative z-10 text-center pb-0 pt-10 !bg-transparent">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <CardTitle className="text-3xl font-black text-white tracking-tight">
              Editar <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Carta</span>
              <span className="text-white/20 text-lg font-normal ml-2">#{id}</span>
            </CardTitle>
          </div>
          <p className="text-xs text-white/30 tracking-widest uppercase">Modifica los datos y guarda los cambios</p>
          <div className="flex items-center gap-3 mt-6 px-7">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/40" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>
        </CardHeader>

        <CardContent className="relative z-10 px-8 pb-9 pt-6 !bg-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8">

            {/* ── COLUMNA IZQUIERDA ── */}
            <div className="space-y-6">

              {/* NOMBRE */}
              <div className="space-y-2">
                <Label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <BadgeCheck className="w-3 h-3 text-yellow-400" />
                  Nombre <span className="text-red-400">*</span>
                </Label>
                <Input
                  value={form.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  placeholder="Nombre de la carta"
                  className="!bg-white/[0.03] border-white/[0.08] !text-white placeholder:text-white/15 focus:border-yellow-400/40 focus:!ring-0 rounded-2xl h-12 text-sm px-4 transition-all duration-300"
                />
              </div>

              {/* CONDICIÓN + ESTADO — del backend */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                    <BadgeCheck className="w-3 h-3 text-blue-400" />
                    Condición <span className="text-red-400">*</span>
                  </Label>
                  <select
                    value={form.idCondicion || ""}
                    onChange={(e) => handleChange("idCondicion", e.target.value ? Number(e.target.value) : "")}
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white rounded-2xl h-12 px-4 text-sm focus:outline-none focus:border-blue-400/40 hover:border-white/15 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0c1320] text-white/50">Selecciona...</option>
                    {condiciones.map((c) => (
                      <option key={c.idCondicion} value={c.idCondicion} className="bg-[#0c1320]">
                        {c.descripcion}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                    <Globe className="w-3 h-3 text-green-400" />
                    Estado <span className="text-red-400">*</span>
                  </Label>
                  <select
                    value={form.idEstadoCarta || ""}
                    onChange={(e) => handleChange("idEstadoCarta", e.target.value ? Number(e.target.value) : "")}
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white rounded-2xl h-12 px-4 text-sm focus:outline-none focus:border-green-400/40 hover:border-white/15 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0c1320] text-white/50">Selecciona...</option>
                    {estados.map((e) => (
                      <option key={e.idEstadoCarta} value={e.idEstadoCarta} className="bg-[#0c1320]">
                        {e.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DESCRIPCIÓN */}
              <div className="space-y-2">
                <Label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <FileText className="w-3 h-3 text-purple-400" />
                  Descripción
                </Label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => handleChange("descripcion", e.target.value)}
                  rows={4}
                  placeholder="Describe la carta: habilidades, rareza, historia..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/15 focus:border-purple-400/40 focus:outline-none hover:border-white/15 rounded-2xl resize-none text-sm px-4 py-3 transition-all duration-300"
                />
              </div>

              {/* CATEGORÍAS — del backend */}
              <div className="space-y-3">
                <Label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  Categorías
                </Label>
                <div className="flex flex-wrap gap-2">
                  {categorias.map((cat) => {
                    const selected = form.categorias.includes(cat.idCategoria);
                    const style    = categoriaStyles[cat.descripcion] ?? "bg-white/10 border-white/20 text-white/60";
                    return (
                      <button
                        key={cat.idCategoria}
                        type="button"
                        onClick={() => toggleCategoria(cat.idCategoria)}
                        className={`
                          px-4 py-2 rounded-full border-2 text-xs font-bold
                          transition-all duration-200
                          ${selected
                            ? `${style} shadow-lg scale-105`
                            : "bg-white/[0.03] text-white/40 border-white/10 hover:border-white/20 hover:text-white/60 hover:bg-white/[0.06]"
                          }
                        `}
                      >
                        {cat.descripcion}
                        {selected && <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* NUEVAS IMÁGENES */}
              <div className="space-y-3">
                <Label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <ImagePlus className="w-3 h-3 text-pink-400" />
                  Agregar imágenes
                </Label>

                {previewNuevos.length > 0 && (
                  <div className="flex flex-wrap gap-3 p-4 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                    {previewNuevos.map((src, i) => (
                      <div key={i} className="relative group/np">
                        <div className="w-20 h-28 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg bg-[#0a0f1e] group-hover/np:border-white/40 transition-all">
                          <img src={src} alt="" className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeNueva(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/np:opacity-100 transition-all shadow z-10"
                        >
                          <X className="w-2.5 h-2.5 text-white" />
                        </button>
                      </div>
                    ))}
                    <div
                      className="w-20 h-28 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-pink-400/30 hover:bg-pink-400/[0.03] transition-all"
                      onClick={() => document.getElementById("nuevasImagenes").click()}
                    >
                      <ImagePlus className="w-4 h-4 text-white/20" />
                      <span className="text-[9px] text-white/20">Agregar</span>
                    </div>
                  </div>
                )}

                {previewNuevos.length === 0 && (
                  <div
                    className="flex flex-col items-center justify-center gap-2 w-full h-24 border-2 border-dashed border-white/[0.08] rounded-2xl cursor-pointer hover:border-pink-400/30 hover:bg-pink-400/[0.03] transition-all group/upload"
                    onClick={() => document.getElementById("nuevasImagenes").click()}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover/upload:bg-pink-400/10 group-hover/upload:border-pink-400/20 transition-all">
                      <ImagePlus className="w-4 h-4 text-white/20 group-hover/upload:text-pink-400/60 transition-colors" />
                    </div>
                    <p className="text-[11px] text-white/30 group-hover/upload:text-white/50 transition-colors">Click para agregar imágenes</p>
                  </div>
                )}

                <input id="nuevasImagenes" type="file" accept="image/*" multiple className="hidden" onChange={handleNuevasImagenes} />
              </div>

            </div>

            {/* ── COLUMNA DERECHA: imagen actual ── */}
            <div className="flex flex-col items-center gap-4">
              <ExistingImagesCarousel
                imagenes={form.imagenesExistentes}
                BASE_URL={BASE_URL}
                onRemove={removeExistente}
              />

              {form.imagenesExistentes.length === 0 && previewNuevos.length === 0 && (
                <div className="w-44 h-60 rounded-[12px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-white/15 bg-white/[0.01]">
                  <FilmIcon className="w-8 h-8" />
                  <p className="text-[10px] text-center px-4">Sin imágenes</p>
                </div>
              )}

              {/* Stats */}
              <div className="w-full space-y-1.5 mt-1">
                <div className="flex items-center justify-between text-[10px] px-1">
                  <span className="text-white/30 uppercase tracking-widest">ID Carta</span>
                  <span className="text-white/50 font-mono">#{id}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] px-1">
                  <span className="text-white/30 uppercase tracking-widest">Imágenes</span>
                  <span className="text-white/50">{form.imagenesExistentes.length + filesNuevos.length}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] px-1">
                  <span className="text-white/30 uppercase tracking-widest">Categorías</span>
                  <span className="text-white/50">{form.categorias.length}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Separador */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/[0.06]" />
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/[0.06]" />
          </div>

          {/* ERROR */}
          {error && (
            <div className="flex items-center gap-2 text-red-300 text-sm bg-red-500/8 border border-red-500/15 rounded-xl px-4 py-3 mb-4">
              <X className="w-4 h-4 shrink-0 text-red-400" />
              {error}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-3">
            <Link to="/carta" className="flex-1">
              <Button type="button" variant="ghost" className="w-full rounded-2xl h-12 border border-white/[0.07] text-white/30 hover:text-white/60 hover:bg-white/[0.04] hover:border-white/10 text-sm transition-all duration-200">
                Cancelar
              </Button>
            </Link>
            <Button
              type="button"
              disabled={saving}
              onClick={handleSubmit}
              className="flex-1 rounded-2xl h-12 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-bold text-sm shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:scale-100"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
