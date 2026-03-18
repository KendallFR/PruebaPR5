import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// icons
import { Save, ArrowLeft } from "lucide-react";

// servicios
import SubastaService from "../../services/SubastaService";
import CartaService from "../../services/CartaService";

// componente select
import { CustomSelect } from "../ui/custom/custom-select";

export function CreateSubasta() {
  const navigate = useNavigate();

  /*** Estados ***/
  const [dataCartas, setDataCartas] = useState([]);
  const [usuario] = useState({ id: 1, nombre: "Usuario Simulado" });
  const [error, setError] = useState("");

  /*** Validación Yup con chequeo de subasta ***/
  const schema = yup.object({
    idCarta: yup
      .number()
      .typeError("Seleccione un objeto")
      .required("Seleccione un objeto")
      .test(
        "subasta-activa",
        "Esta carta ya tiene una subasta activa",
        async function (value) {
          if (!value) return true;
          try {
            const res = await SubastaService.getSubastaCarta(value);
            return !(res.data?.data?.length > 0);
          } catch (err) {
            // Si no existe subasta => pasa
            if (err.response?.status === 404) return true;
            // Otros errores => marcar como inválido
            return this.createError({ message: "Error al validar subasta de la carta" });
          }
        }
      ),
    fechaInicio: yup.date().required("Fecha inicio requerida"),
    fechaCierre: yup
      .date()
      .required("Fecha cierre requerida")
      .test(
        "fecha-valida",
        "La fecha cierre debe ser mayor que inicio",
        function (value) {
          const { fechaInicio } = this.parent;
          return value > fechaInicio;
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

  /*** React Hook Form ***/
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      idCarta: "",
      fechaInicio: "",
      fechaCierre: "",
      precio: "",
      incrementoMin: "",
    },
    resolver: yupResolver(schema),
  });

  /*** Cargar cartas activas ***/
  useEffect(() => {
    const fetchCartas = async () => {
      try {
        const res = await CartaService.allCartasActivas();
        setDataCartas(res.data.data || []);
      } catch (err) {
        console.error(err);
        if (err.name !== "AbortError") setError("Error al cargar cartas: " + err.message);
      }
    };
    fetchCartas();
  }, []);

  /*** Submit del formulario ***/
  const onSubmit = async (dataForm) => {
    const subasta = {
      ...dataForm,
      idCarta: Number(dataForm.idCarta),
      precio: Number(dataForm.precio),
      incrementoMin: Number(dataForm.incrementoMin),
      idUsuario: usuario.id,
    };

    try {
      // Crear la subasta
      const response = await SubastaService.createSubasta(subasta);
      if (response.data) {
        toast.success("Subasta creada correctamente");
        navigate("/subasta/SubastasFinalizadas");
      } else {
        toast.error("Error al crear subasta");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error inesperado al crear subasta");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Crear Subasta</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label>Usuario</Label>
          <Input value={usuario.nombre} disabled />
        </div>

        {/* Selección de carta con validación de subasta activa */}
        <Controller
          name="idCarta"
          control={control}
          render={({ field }) => (
            <CustomSelect
              field={field}
              data={dataCartas}
              label="Objeto"
              getOptionLabel={(item) => item.nombre}
              getOptionValue={(item) => item.idCarta}
              error={errors.idCarta?.message} // Aquí se muestra el error rojo
            />
          )}
        />

        <div>
          <Label>Fecha Inicio</Label>
          <Controller
            name="fechaInicio"
            control={control}
            render={({ field }) => (
              <Input type="datetime-local" {...field} className={errors.fechaInicio ? "border-red-500" : ""} />
            )}
          />
          {errors.fechaInicio && <p className="text-red-500">{errors.fechaInicio.message}</p>}
        </div>

        <div>
          <Label>Fecha Cierre</Label>
          <Controller
            name="fechaCierre"
            control={control}
            render={({ field }) => (
              <Input type="datetime-local" {...field} className={errors.fechaCierre ? "border-red-500" : ""} />
            )}
          />
          {errors.fechaCierre && <p className="text-red-500">{errors.fechaCierre.message}</p>}
        </div>

        <div>
          <Label>Precio Base</Label>
          <Controller
            name="precio"
            control={control}
            render={({ field }) => (
              <Input type="number" {...field} className={errors.precio ? "border-red-500" : ""} />
            )}
          />
          {errors.precio && <p className="text-red-500">{errors.precio.message}</p>}
        </div>

        <div>
          <Label>Incremento Mínimo</Label>
          <Controller
            name="incrementoMin"
            control={control}
            render={({ field }) => (
              <Input type="number" {...field} className={errors.incrementoMin ? "border-red-500" : ""} />
            )}
          />
          {errors.incrementoMin && <p className="text-red-500">{errors.incrementoMin.message}</p>}
        </div>

        <div className="flex justify-between gap-4">
          <Button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </Button>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar
          </Button>
        </div>
      </form>
    </Card>
  );
}