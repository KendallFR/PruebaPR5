import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

// UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Icons
import { Save, ArrowLeft, Gavel, Sparkles, BadgeCheck, CalendarClock, DollarSign, TrendingUp, FilmIcon } from "lucide-react";

// Servicios
import SubastaService from "../../services/SubastaService";
import CartaService from "../../services/CartaService";


// Select custom
import { CustomSelect } from "../ui/custom/custom-select";
import { useUser } from "@/hooks/useUser";

export function CreateSubasta() {
  const navigate = useNavigate();
  const location = useLocation();

  // Carta preseleccionada desde ListCardCartas (navigate con state)
  const cartaPreseleccionada = location.state?.carta ?? null;
const { user } = useUser();
  const [dataCartas, setDataCartas] = useState([]);
  const [error, setError] = useState("");

  /* ── Validación Yup ── */
  const schema = yup.object({
    idCarta: yup
      .number()
      .typeError("Seleccione una carta")
      .required("Seleccione una carta"),
    fechaInicio: yup
      .date()
      .transform((val, orig) => (orig ? new Date(orig) : val))
      .typeError("Fecha inicio inválida")
      .required("Fecha inicio requerida"),
    fechaCierre: yup
      .date()
      .transform((val, orig) => (orig ? new Date(orig) : val))
      .typeError("Fecha cierre inválida")
      .required("Fecha cierre requerida")
      .test(
        "fecha-valida",
        "La fecha cierre debe ser mayor que inicio",
        function (value) {
          const { fechaInicio } = this.parent;
          if (!fechaInicio || !value) return true;
          return new Date(value) > new Date(fechaInicio);
        }
      ),
    precio: yup
      .number()
      .typeError("Debe ser número")
      .required("Precio requerido")
      .positive("Debe ser mayor a 0"),
    incrementoMin: yup
      .number()
      .typeError("Debe ser número")
      .required("Incremento requerido")
      .positive("Debe ser mayor a 0"),
  });

  /* ── React Hook Form ── */
  const {
  control,
  handleSubmit,
  setValue,
  formState: { errors },
} = useForm({
  defaultValues: {
    idCarta: cartaPreseleccionada ? cartaPreseleccionada.idCarta : "",
    fechaInicio: "",
    fechaCierre: "",
    precio: "",
    incrementoMin: "",
  },
  resolver: yupResolver(schema),
  mode: "onBlur", // <- valida cuando un campo pierde el foco
  reValidateMode: "onChange", // <- opcional, vuelve a validar mientras escriben
});

  /* ── Sincronizar carta preseleccionada con RHF ── */
  useEffect(() => {
    if (cartaPreseleccionada?.idCarta) {
      setValue("idCarta", cartaPreseleccionada.idCarta, { shouldValidate: false });
    }
  }, [cartaPreseleccionada, setValue]);

  /* ── Cargar cartas activas ── */
  useEffect(() => {
    const fetchCartas = async () => {
      try {
        const res = await CartaService.allCartasActivas();
        setDataCartas(res.data.data || []);
      } catch (err) {
        console.error(err);
        if (err.name !== "AbortError")
          setError("Error al cargar cartas: " + err.message);
      }
    };
    fetchCartas();
  }, []);


  /* ── Submit ── */
  const onSubmit = async (dataForm) => {
    const subasta = {
      idCarta: Number(dataForm.idCarta),
      fechaInicio:
        dataForm.fechaInicio instanceof Date
          ? dataForm.fechaInicio.toISOString()
          : new Date(dataForm.fechaInicio).toISOString(),
      fechaCierre:
        dataForm.fechaCierre instanceof Date
          ? dataForm.fechaCierre.toISOString()
          : new Date(dataForm.fechaCierre).toISOString(),
      precio: Number(dataForm.precio),
      incrementoMin: Number(dataForm.incrementoMin),
      idUsuario: user.idUsuario, // <-- enviamos el ID correcto
    };

    try {
      const response = await SubastaService.createSubasta(subasta);
      if (response.data) {
        toast.success("Subasta creada correctamente");
        navigate("/subasta/SubastasActivas");
      } else {
        toast.error("Error al crear subasta");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error inesperado al crear subasta");
    }
  };

  if (error) return <p className="text-red-400 p-6">{error}</p>;

  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] flex flex-col items-center py-10 px-4">

      {/* BACK */}
      <div className="w-full max-w-2xl mb-5">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-white/40 hover:text-white flex items-center gap-2 pl-0 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </Button>
      </div>

      <Card className="w-full max-w-2xl relative overflow-hidden border border-yellow-400/20 !bg-[#0d1424]/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-yellow-400/10 transition-all duration-500">

        {/* Glow top */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-yellow-400/8 via-transparent to-transparent" />
        <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

        {/* HEADER */}
        <CardHeader className="relative z-10 text-center pb-2 pt-8 !bg-transparent">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Gavel className="w-5 h-5 text-yellow-400" />
            <CardTitle className="text-2xl font-bold text-white tracking-tight">
              Nueva <span className="text-yellow-400">Subasta</span>
            </CardTitle>
          </div>
          <p className="text-xs text-white/35 tracking-wide">
            Configura los parámetros de tu subasta
          </p>
        </CardHeader>

        <CardContent className="relative z-10 px-7 pb-8 pt-4 !bg-transparent">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* ── CARTA PRESELECCIONADA (preview) ── */}
            {cartaPreseleccionada ? (
              <div className="space-y-1.5">
                <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  Carta seleccionada
                </Label>
                <div className="flex items-center gap-4 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3">
                  <div className="w-12 h-16 rounded-lg overflow-hidden border border-white/20 flex-shrink-0 bg-[#0a0f1e]">
                    {cartaPreseleccionada.imagenes?.length > 0 ? (
                      <img
                        src={`${BASE_URL}/${cartaPreseleccionada.imagenes[0].imagen}`}
                        alt={cartaPreseleccionada.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FilmIcon className="w-5 h-5 text-white/20" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{cartaPreseleccionada.nombre}</p>
                    <p className="text-white/40 text-xs mt-0.5">{cartaPreseleccionada.condicion?.descripcion}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {cartaPreseleccionada.categorias?.map((cat, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-yellow-400/15 text-yellow-300 text-[10px] font-semibold rounded-full">
                          {cat.descripcion}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Controller
                    name="idCarta"
                    control={control}
                    render={({ field }) => (
                      <input type="hidden" {...field} />
                    )}
                  />
                </div>
                {errors.idCarta && <p className="text-red-400 text-xs mt-1">{errors.idCarta.message}</p>}
              </div>
            ) : (
              <Controller
                name="idCarta"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    field={field}
                    data={dataCartas}
                    label="Carta"
                    getOptionLabel={(item) => item.nombre}
                    getOptionValue={(item) => item.idCarta}
                    error={errors.idCarta?.message}
                  />
                )}
              />
            )}

            {/* ── USUARIO ── */}
            <div className="space-y-1.5">
              <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />
                Usuario
              </Label>
              <Input
                value={user.nombre}
                disabled
                className="!bg-white/[0.04] border-white/10 !text-white/40 rounded-xl h-11 text-sm cursor-not-allowed"
              />
            </div>

            {/* ── FECHAS ── */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <CalendarClock className="w-3.5 h-3.5 text-purple-400" />
                  Fecha Inicio <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="fechaInicio"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="datetime-local"
                      {...field}
                      className={`!bg-white/[0.04] border-white/10 !text-white rounded-xl h-11 text-sm focus:border-purple-400/50 ${errors.fechaInicio ? "border-red-500/60" : ""}`}
                    />
                  )}
                />
                {errors.fechaInicio && <p className="text-red-400 text-xs">{errors.fechaInicio.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <CalendarClock className="w-3.5 h-3.5 text-orange-400" />
                  Fecha Cierre <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="fechaCierre"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="datetime-local"
                      {...field}
                      className={`!bg-white/[0.04] border-white/10 !text-white rounded-xl h-11 text-sm focus:border-orange-400/50 ${errors.fechaCierre ? "border-red-500/60" : ""}`}
                    />
                  )}
                />
                {errors.fechaCierre && <p className="text-red-400 text-xs">{errors.fechaCierre.message}</p>}
              </div>
            </div>

            {/* ── PRECIO + INCREMENTO ── */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-green-400" />
                  Precio Base <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="precio"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="0.00"
                      {...field}
                      className={`!bg-white/[0.04] border-white/10 !text-white placeholder:text-white/20 rounded-xl h-11 text-sm focus:border-green-400/50 ${errors.precio ? "border-red-500/60" : ""}`}
                    />
                  )}
                />
                {errors.precio && <p className="text-red-400 text-xs">{errors.precio.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label className="text-white/60 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  Incremento Mín. <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="incrementoMin"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder="0.00"
                      {...field}
                      className={`!bg-white/[0.04] border-white/10 !text-white placeholder:text-white/20 rounded-xl h-11 text-sm focus:border-cyan-400/50 ${errors.incrementoMin ? "border-red-500/60" : ""}`}
                    />
                  )}
                />
                {errors.incrementoMin && <p className="text-red-400 text-xs">{errors.incrementoMin.message}</p>}
              </div>
            </div>

            {/* Separador */}
            <div className="h-px bg-white/[0.06] rounded-full" />

            {/* ACTIONS */}
            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 rounded-xl border border-white/10 bg-transparent text-white/50 hover:text-white hover:bg-white/5 text-sm flex items-center justify-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Regresar
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm shadow-lg shadow-yellow-400/20 hover:scale-[1.02] hover:shadow-yellow-400/35 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Guardar Subasta
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}