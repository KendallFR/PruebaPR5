import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import { Save, ArrowLeft } from "lucide-react";

import UsuarioService from "../../services/UsuarioService";

export function UpdateUsuario() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");

  /** VALIDACIÓN */
  const usuarioSchema = yup.object({

    nombre: yup
      .string()
      .required("El nombre es requerido"),

    email: yup
      .string()
      .email("Ingrese un correo válido")
      .required("El correo es requerido"),

  });

  const { control, handleSubmit, reset, formState:{errors} } = useForm({

    defaultValues:{
      nombre:"",
      email:"",
    },

    resolver:yupResolver(usuarioSchema)

  });

  /** CARGAR DATOS */
  useEffect(()=>{

    const fetchData = async ()=>{

      try{

        const usuarioRes = await UsuarioService.getUsuarioById(id);

        if(usuarioRes.data){

          const usuario = usuarioRes.data.data;

          reset({
            nombre: usuario.nombre,
            email: usuario.email,
          });

        }

      }catch(err){

        console.error(err);
        setError("Error cargando datos");

      }

    }

    fetchData();

  },[id,reset]);



  /** SUBMIT */
  const onSubmit = async (dataForm)=>{

    try{

      const usuario = {
        idUsuario: id,
        ...dataForm,
      };

      const response = await UsuarioService.updateUsuario(usuario);

      if(response.data){

        toast.success("Usuario actualizado correctamente",{
          duration:3000
        });

        navigate("/usuario/table");

      }

    }catch(err){

      console.error(err);
      toast.error("Error al actualizar usuario");

    }

  };


  if(error) return <p className="text-red-600">{error}</p>;



  return (

    <Card className="p-6 max-w-5xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">
        Actualizar Usuario
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* NOMBRE */}
        <div>

          <Label>Nombre</Label>

          <Controller
            name="nombre"
            control={control}
            render={({field})=>(
              <Input {...field}/>
            )}
          />

          {errors.nombre && (
            <p className="text-red-500 text-sm">
              {errors.nombre.message}
            </p>
          )}

        </div>


        {/* EMAIL */}
        <div>

          <Label>Email</Label>

          <Controller
            name="email"
            control={control}
            render={({field})=>(
              <Input {...field}/>
            )}
          />

          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}

        </div>
        {/* BOTONES */}
        <div className="flex justify-between gap-4">

          <Button
            type="button"
            onClick={()=>navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4"/>
            Regresar
          </Button>

          <Button type="submit" className="flex items-center gap-2">

            <Save className="w-4 h-4"/>
            Actualizar

          </Button>

        </div>

      </form>

    </Card>

  );

}