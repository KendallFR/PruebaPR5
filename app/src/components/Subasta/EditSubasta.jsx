import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Save,
  Gavel,
  Clock,
  TrendingUp,
  BadgeCheck,
  Sparkles,
  FilmIcon,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SubastaService from "@/services/SubastaService";
import toast from "react-hot-toast";

export function EditSubasta() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const BASE_URL  = import.meta.env.VITE_BASE_URL + "uploads";

  const [subasta,  setSubasta]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [errors,   setErrors]   = useState({});

  const [form, setForm] = useState({
    fechaInicio:   "",
    fechaCierre:   "",
    precio:        "",
    incrementoMin: "",
  });

  /* ── Cargar subasta ── */
useEffect(() => {
  const fetchSubasta = async () => {
    try {
      const res  = await SubastaService.getSubastaById(id);
      
      //  la subasta viene en res.data.data o res.data según la API
      const data = res.data?.data ?? res.data;
      
      setSubasta(data);

      const toDatetimeLocal = (str) => {
        if (!str) return "";
        return str.replace(" ", "T").substring(0, 16);
      };

      setForm({
        fechaInicio:   toDatetimeLocal(data.fechaInicio),
        fechaCierre:   toDatetimeLocal(data.fechaCierre),
        precio:        data.precio        ?? "",
        incrementoMin: data.incrementoMin ?? "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error al cargar la subasta");
    } finally {
      setLoading(false);
    }
  };
  fetchSubasta();
}, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  /* ── Validar ── */
  const validate = () => {
    const newErrors = {};
    if (!form.fechaInicio)              newErrors.fechaInicio   = "Fecha de inicio requerida";
    if (!form.fechaCierre)              newErrors.fechaCierre   = "Fecha de cierre requerida";
    if (!form.precio || Number(form.precio) <= 0)
                                        newErrors.precio        = "Precio debe ser mayor a 0";
    if (!form.incrementoMin || Number(form.incrementoMin) <= 0)
                                        newErrors.incrementoMin = "Incremento debe ser mayor a 0";
    if (form.fechaInicio && form.fechaCierre && form.fechaCierre <= form.fechaInicio)
                                        newErrors.fechaCierre   = "El cierre debe ser después del inicio";
    return newErrors;
  };

  /* ── Guardar ── */
  const handleSubmit = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    try {
      await SubastaService.updateSubasta(id, {
        fechaInicio:   form.fechaInicio,
        fechaCierre:   form.fechaCierre,
        precio:        Number(form.precio),
        incrementoMin: Number(form.incrementoMin),
      });
      toast.success("Subasta actualizada correctamente");
      navigate("/subasta/SubastasActivas");
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar la subasta");
    } finally {
      setSaving(false);
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Cargando subasta...</p>
        </div>
      </div>
    );
  }

  if (!subasta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-white/60">No se encontró la subasta.</p>
          <Link to="/subasta/SubastasActivas">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-300">Volver</Button>
          </Link>
        </div>
      </div>
    );
  }

  const carta = subasta.carta;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] flex flex-col items-center py-10 px-4">

      {/* BACK */}
      <div className="w-full max-w-2xl mb-5">
        <Link to="/subasta/SubastasActivas">
          <Button variant="ghost" className="text-white/40 hover:text-white flex items-center gap-2 pl-0 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver al listado
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-2xl relative overflow-hidden border border-yellow-400/20 !bg-[#0d1424]/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-yellow-400/10 transition-all duration-500">

        {/* Glow fondo */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

        {/* HEADER */}
        <CardHeader className="relative z-10 text-center pb-2 pt-8 !bg-transparent">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Gavel className="w-5 h-5 text-yellow-400" />
            <CardTitle className="text-2xl font-bold text-white tracking-tight">
              Editar <span className="text-yellow-400">Subasta</span>
              <span className="text-white/30 font-normal text-lg ml-2">#{subasta.idSubasta}</span>
            </CardTitle>
          </div>
          <p className="text-xs text-white/35 tracking-wide">
            Modifica los datos de la subasta
          </p>
        </CardHeader>

        <CardContent className="relative z-10 space-y-5 px-7 pb-8 !bg-transparent">

          {/* CARTA ASOCIADA — solo lectura */}
          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/8 rounded-2xl p-4">
            {/* Imagen carta */}
            <div className="
              relative w-16 h-24 shrink-0
              rounded-[8px] overflow-hidden
              border-2 border-white/25
              shadow-lg shadow-black/50
              bg-[#0a0f1e]
            ">
              {carta?.imagenes?.length > 0 ? (
                <>
                  <img
                    src={`${BASE_URL}/${carta.imagenes[0].imagen}`}
                    alt={carta.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/15">
                  <FilmIcon className="w-6 h-6" />
                </div>
              )}
            </div>

            {/* Info carta */}
            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">Carta asociada</p>
              <p className="text-white font-bold text-base truncate flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                {carta?.nombre ?? "—"}
              </p>
              {carta?.categorias?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {carta.categorias.map((cat, i) => (
                    <span key={i} className="px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-yellow-400/15 text-yellow-300 border border-yellow-400/20">
                      {cat.descripcion}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Estado actual */}
            <div className="shrink-0 text-right">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Estado</p>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                subasta.estadoSubasta?.descripcion === "Activa"
                  ? "bg-green-500/20 text-green-300 border-green-500/40"
                  : "bg-orange-500/20 text-orange-300 border-orange-500/40"
              }`}>
                {subasta.estadoSubasta?.descripcion ?? "—"}
              </span>
            </div>
          </div>

          {/* FECHAS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                Fecha inicio <span className="text-red-400">*</span>
              </Label>
              <Input
                type="datetime-local"
                value={form.fechaInicio}
                onChange={(e) => handleChange("fechaInicio", e.target.value)}
                className="!bg-white/[0.04] border-white/10 !text-white rounded-xl h-11 text-sm focus:border-purple-400/50"
              />
              {errors.fechaInicio && <p className="text-red-400 text-xs mt-1">{errors.fechaInicio}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-400" />
                Fecha cierre <span className="text-red-400">*</span>
              </Label>
              <Input
                type="datetime-local"
                value={form.fechaCierre}
                onChange={(e) => handleChange("fechaCierre", e.target.value)}
                className="!bg-white/[0.04] border-white/10 !text-white rounded-xl h-11 text-sm focus:border-red-400/50"
              />
              {errors.fechaCierre && <p className="text-red-400 text-xs mt-1">{errors.fechaCierre}</p>}
            </div>
          </div>

          {/* PRECIO + INCREMENTO */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-yellow-400" />
                Precio base <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.precio}
                  onChange={(e) => handleChange("precio", e.target.value)}
                  className="!bg-white/[0.04] border-white/10 !text-white rounded-xl h-11 text-sm pl-7 focus:border-yellow-400/50"
                />
              </div>
              {errors.precio && <p className="text-red-400 text-xs mt-1">{errors.precio}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                Incremento mín. <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.incrementoMin}
                  onChange={(e) => handleChange("incrementoMin", e.target.value)}
                  className="!bg-white/[0.04] border-white/10 !text-white rounded-xl h-11 text-sm pl-7 focus:border-green-400/50"
                />
              </div>
              {errors.incrementoMin && <p className="text-red-400 text-xs mt-1">{errors.incrementoMin}</p>}
            </div>
          </div>

          {/* Separador */}
          <div className="h-px bg-white/[0.06] rounded-full" />

          {/* ACTIONS */}
          <div className="flex gap-3 pt-1">
            <Link to="/subasta/SubastasActivas" className="flex-1">
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
              disabled={saving}
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
              {saving
                ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                : <Save className="w-4 h-4" />
              }
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
