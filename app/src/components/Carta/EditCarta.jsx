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
import { categoriaStyles, categoriaGlow } from "../../utils/categoriaColors";

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

          <div className="absolute top-2 left-2 bg-black/60 text-white/60 text-[9px] font-bold px-1.5 py-0.5 rounded-full backdrop-blur-sm z-10">
            {cur + 1}/{total}
          </div>

          <button type="button"
            onClick={() => { onRemove(cur); setCur((c) => Math.max(0, c - 1)); }}
            className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center shadow-lg transition-all duration-150 opacity-0 group-hover/car:opacity-100">
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
                    className={`rounded-full transition-all duration-200 ${i === cur ? "w-3.5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/35 hover:bg-white/60"}`} />
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
  const [errors,      setErrors]      = useState({});
  const [touched,     setTouched]     = useState({});

  const [categorias,  setCategorias]  = useState([]);
  const [condiciones, setCondiciones] = useState([]);
  const [estados,     setEstados]     = useState([]);

  const [filesNuevos,       setFilesNuevos]       = useState([]);
  const [previewNuevos,     setPreviewNuevos]     = useState([]);
  const [imagenesAEliminar, setImagenesAEliminar] = useState([]);

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

  /* ── Cargar todo ── */
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

  /* ── Glow dinámico ── */
  const firstCat  = categorias.find((c) => form.categorias.includes(c.idCategoria));
  const glowData  = firstCat ? (categoriaGlow[firstCat.descripcion] ?? null) : null;
  const glowClass = glowData ? glowData.border : "border-white/[0.07]";

  /* ── Validación ── */
  const validateField = (field, value) => {
    let msg = "";
    if (field === "nombre"        && !(value ?? "").trim())       msg = "Nombre requerido";
    if (field === "idCondicion"   && !value)                      msg = "Selecciona una condición";
    if (field === "idEstadoCarta" && !value)                      msg = "Selecciona un estado";
    if (field === "descripcion"   && !(value ?? "").trim())       msg = "Agrega una descripción";
    if (field === "descripcion"   && (value ?? "").trim().length > 0 && (value ?? "").trim().length < 20)
                                                                  msg = "La descripción debe tener al menos 20 caracteres";
    return msg;
  };

  const handleBlur = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const toggleCategoria = (idCategoria) =>
    setForm((p) => {
      const nuevas = p.categorias.includes(idCategoria)
        ? p.categorias.filter((c) => c !== idCategoria)
        : [...p.categorias, idCategoria];
      setErrors((e) => ({ ...e, categorias: nuevas.length === 0 ? "Selecciona al menos una categoría" : "" }));
      return { ...p, categorias: nuevas };
    });

  const handleNuevasImagenes = (e) => {
    const files    = Array.from(e.target.files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setFilesNuevos((prev)   => [...prev, ...files]);
    setPreviewNuevos((prev) => [...prev, ...previews]);
    setErrors((err) => ({ ...err, imagenes: "" }));
  };

  const removeNueva = (i) => {
    setFilesNuevos((prev) => {
      const updated = prev.filter((_, idx) => idx !== i);
      if (updated.length === 0 && form.imagenesExistentes.length === 0)
        setErrors((e) => ({ ...e, imagenes: "Agrega al menos una imagen" }));
      return updated;
    });
    setPreviewNuevos((prev) => prev.filter((_, idx) => idx !== i));
  };

  const removeExistente = (i) => {
    const img      = form.imagenesExistentes[i];
    const idImagen = img.id ?? img.idImagen;
    setImagenesAEliminar((prev) => [...prev, idImagen]);
    setForm((p) => {
      const updated = p.imagenesExistentes.filter((_, idx) => idx !== i);
      if (updated.length === 0 && filesNuevos.length === 0)
        setErrors((e) => ({ ...e, imagenes: "Agrega al menos una imagen" }));
      else
        setErrors((e) => ({ ...e, imagenes: "" }));
      return { ...p, imagenesExistentes: updated };
    });
  };

  /* ── Submit ── */
  const handleSubmit = async () => {
    const newErrors = {};
    if (!form.nombre?.trim())                             newErrors.nombre        = "Nombre requerido";
    if (!form.idCondicion)                                newErrors.idCondicion   = "Selecciona una condición";
    if (!form.idEstadoCarta)                              newErrors.idEstadoCarta = "Selecciona un estado";
    if (!form.descripcion?.trim())                        newErrors.descripcion   = "Agrega una descripción";
    else if (form.descripcion.trim().length < 20)         newErrors.descripcion   = "La descripción debe tener al menos 20 caracteres";
    if (form.categorias.length === 0)                     newErrors.categorias    = "Selecciona al menos una categoría";
    if (form.imagenesExistentes.length === 0 && filesNuevos.length === 0)
                                                          newErrors.imagenes      = "Agrega al menos una imagen";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    setError(null);
    try {
      const fechaMySQL = form.fechaRegistro
        ? form.fechaRegistro.slice(0, 19).replace("T", " ")
        : new Date().toISOString().slice(0, 19).replace("T", " ");

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

      for (const idImagen of imagenesAEliminar) {
        await ImageService.deleteImage(idImagen);
      }

      if (filesNuevos.length > 0) {
        for (const file of filesNuevos) {
          const formData = new FormData();
          formData.append("file",    file);
          formData.append("idCarta", id);
          await ImageService.createImage(formData);
        }
      }

      toast.success("Carta actualizada correctamente");
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

      <Card className={`w-full max-w-3xl relative overflow-hidden border !bg-[#0d1424]/95 backdrop-blur-xl rounded-3xl transition-all duration-700 shadow-2xl ${glowClass}`}>

        <div className="absolute top-0 left-0 right-0 h-[2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
        </div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

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
                  onBlur={(e)   => handleBlur("nombre", e.target.value)}
                  placeholder="Nombre de la carta"
                  className="!bg-white/[0.03] border-white/[0.08] !text-white placeholder:text-white/15 focus:border-yellow-400/40 focus:!ring-0 rounded-2xl h-12 text-sm px-4 transition-all duration-300"
                />
                {errors.nombre && <p className="text-red-400/80 text-[11px] flex items-center gap-1.5 pl-1"><span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />{errors.nombre}</p>}
              </div>

              {/* CONDICIÓN + ESTADO */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                    <BadgeCheck className="w-3 h-3 text-blue-400" />
                    Condición <span className="text-red-400">*</span>
                  </Label>
                  <select
                    value={form.idCondicion || ""}
                    onChange={(e) => handleChange("idCondicion", e.target.value ? Number(e.target.value) : "")}
                    onBlur={(e)   => handleBlur("idCondicion", e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white rounded-2xl h-12 px-4 text-sm focus:outline-none focus:border-blue-400/40 hover:border-white/15 transition-all appearance-none cursor-pointer">
                    <option value="" className="bg-[#0c1320] text-white/50">Selecciona...</option>
                    {condiciones.map((c) => (
                      <option key={c.idCondicion} value={c.idCondicion} className="bg-[#0c1320]">{c.descripcion}</option>
                    ))}
                  </select>
                  {errors.idCondicion && <p className="text-red-400/80 text-[11px] flex items-center gap-1.5 pl-1"><span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />{errors.idCondicion}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                    <Globe className="w-3 h-3 text-green-400" />
                    Estado <span className="text-red-400">*</span>
                  </Label>
                  <select
                    value={form.idEstadoCarta || ""}
                    onChange={(e) => handleChange("idEstadoCarta", e.target.value ? Number(e.target.value) : "")}
                    onBlur={(e)   => handleBlur("idEstadoCarta", e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-white rounded-2xl h-12 px-4 text-sm focus:outline-none focus:border-green-400/40 hover:border-white/15 transition-all appearance-none cursor-pointer">
                    <option value="" className="bg-[#0c1320] text-white/50">Selecciona...</option>
                    {estados.map((e) => (
                      <option key={e.idEstadoCarta} value={e.idEstadoCarta} className="bg-[#0c1320]">{e.descripcion}</option>
                    ))}
                  </select>
                  {errors.idEstadoCarta && <p className="text-red-400/80 text-[11px] flex items-center gap-1.5 pl-1"><span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />{errors.idEstadoCarta}</p>}
                </div>
              </div>

              {/* DESCRIPCIÓN */}
              <div className="space-y-2">
                <Label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <FileText className="w-3 h-3 text-purple-400" />
                  Descripción <span className="text-red-400">*</span>
                </Label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => handleChange("descripcion", e.target.value)}
                  onBlur={(e)   => handleBlur("descripcion", e.target.value)}
                  rows={4}
                  placeholder="Describe la carta: habilidades, rareza, historia..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/15 focus:border-purple-400/40 focus:outline-none hover:border-white/15 rounded-2xl resize-none text-sm px-4 py-3 transition-all duration-300"
                />
                {errors.descripcion && <p className="text-red-400/80 text-[11px] flex items-center gap-1.5 pl-1"><span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />{errors.descripcion}</p>}
              </div>

              {/* CATEGORÍAS — todas las 21 con colores */}
              <div className="space-y-3">
                <Label className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  Categorías <span className="text-red-400">*</span>
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
                        className={`px-4 py-2 rounded-full border-2 text-xs font-bold transition-all duration-200 ${
                          selected
                            ? `${style} shadow-lg scale-105`
                            : "bg-white/[0.03] text-white/40 border-white/10 hover:border-white/20 hover:text-white/60 hover:bg-white/[0.06]"
                        }`}>
                        {cat.descripcion}
                        {selected && <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                      </button>
                    );
                  })}
                </div>
                {errors.categorias && <p className="text-red-400/80 text-[11px] flex items-center gap-1.5 pl-1"><span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />{errors.categorias}</p>}
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
                        <button type="button" onClick={() => removeNueva(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/np:opacity-100 transition-all shadow z-10">
                          <X className="w-2.5 h-2.5 text-white" />
                        </button>
                      </div>
                    ))}
                    <div className="w-20 h-28 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-pink-400/30 hover:bg-pink-400/[0.03] transition-all"
                      onClick={() => document.getElementById("nuevasImagenes").click()}>
                      <ImagePlus className="w-4 h-4 text-white/20" />
                      <span className="text-[9px] text-white/20">Agregar</span>
                    </div>
                  </div>
                )}

                {previewNuevos.length === 0 && (
                  <div className="flex flex-col items-center justify-center gap-2 w-full h-24 border-2 border-dashed border-white/[0.08] rounded-2xl cursor-pointer hover:border-pink-400/30 hover:bg-pink-400/[0.03] transition-all group/upload"
                    onClick={() => document.getElementById("nuevasImagenes").click()}>
                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover/upload:bg-pink-400/10 group-hover/upload:border-pink-400/20 transition-all">
                      <ImagePlus className="w-4 h-4 text-white/20 group-hover/upload:text-pink-400/60 transition-colors" />
                    </div>
                    <p className="text-[11px] text-white/30 group-hover/upload:text-white/50 transition-colors">Click para agregar imágenes</p>
                  </div>
                )}

                <input id="nuevasImagenes" type="file" accept="image/*" multiple className="hidden" onChange={handleNuevasImagenes} />
                {errors.imagenes && <p className="text-red-400/80 text-[11px] flex items-center gap-1.5 pl-1"><span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />{errors.imagenes}</p>}
              </div>
            </div>

            {/* ── COLUMNA DERECHA: imagen actual ── */}
            <div className="flex flex-col items-center gap-4">
              <ExistingImagesCarousel imagenes={form.imagenesExistentes} BASE_URL={BASE_URL} onRemove={removeExistente} />

              {form.imagenesExistentes.length === 0 && previewNuevos.length === 0 && (
                <div className="w-44 h-60 rounded-[12px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-white/15 bg-white/[0.01]">
                  <FilmIcon className="w-8 h-8" />
                  <p className="text-[10px] text-center px-4">Sin imágenes</p>
                </div>
              )}

              <div className="w-full space-y-1.5 mt-1">
                {[
                  { label: "ID Carta",   value: `#${id}` },
                  { label: "Imágenes",   value: form.imagenesExistentes.length + filesNuevos.length },
                  { label: "Categorías", value: form.categorias.length },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] px-1">
                    <span className="text-white/30 uppercase tracking-widest">{s.label}</span>
                    <span className="text-white/50 font-mono">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Separador */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/[0.06]" />
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/[0.06]" />
          </div>

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
            <Button type="button" disabled={saving} onClick={handleSubmit}
              className="flex-1 rounded-2xl h-12 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-bold text-sm shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:scale-100">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
