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
import RolService from "../../services/RolService";
import EstadoUsuarioService from "../../services/EstadoUsuarioService";

import { CustomSelect } from "../ui/custom/custom-select";

export function UpdateUsuario() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [dataRoles, setDataRoles] = useState([]);
  const [dataEstados, setDataEstados] = useState([]);
  const [error, setError] = useState("");

  /** VALIDACIÓN */
  const usuarioSchema = yup.object({

    cedula: yup
      .string()
      .required("La cédula es requerida"),

    nombre: yup
      .string()
      .required("El nombre es requerido"),

    email: yup
      .string()
      .email("Ingrese un correo válido")
      .required("El correo es requerido"),

    password: yup
      .string()
      .required("La contraseña es requerida")
      .min(6, "Mínimo 6 caracteres"),

    idRol: yup
      .string()
      .required("Seleccione un rol"),

    idEstadoUsuario: yup
      .string()
      .required("Seleccione un estado")

  });

  const { control, handleSubmit, reset, formState:{errors} } = useForm({

    defaultValues:{
      idUsuario:"",
      cedula:"",
      nombre:"",
      email:"",
      password:"",
      idRol:"",
      idEstadoUsuario:""
    },

    resolver:yupResolver(usuarioSchema)

  });

  /** CARGAR DATOS */
  useEffect(()=>{

    const fetchData = async ()=>{

      try{

        const rolesRes = await RolService.getRoles();
        const estadosRes = await EstadoUsuarioService.getEstadoUsuarios();
        const usuarioRes = await UsuarioService.getUsuarioById(id);

        setDataRoles(rolesRes.data.data || []);
        setDataEstados(estadosRes.data.data || []);

        if(usuarioRes.data){

          const usuario = usuarioRes.data.data;

          reset({
            idUsuario: usuario.idUsuario,
            cedula: usuario.cedula,
            nombre: usuario.nombre,
            email: usuario.email,
            password: "",
            idRol: usuario.idRol,
            idEstadoUsuario: usuario.idEstadoUsuario
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
        ...dataForm,
        idRol: Number(dataForm.idRol),
        idEstadoUsuario: Number(dataForm.idEstadoUsuario)
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

        {/* CEDULA */}
        <div>

          <Label>Cédula</Label>

          <Controller
            name="cedula"
            control={control}
            render={({field})=>(
              <Input {...field}/>
            )}
          />

          {errors.cedula && (
            <p className="text-red-500 text-sm">
              {errors.cedula.message}
            </p>
          )}

        </div>


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


        {/* PASSWORD */}
        <div>

          <Label>Password</Label>

          <Controller
            name="password"
            control={control}
            render={({field})=>(
              <Input type="password" {...field}/>
            )}
          />

          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}

        </div>


        {/* ROL */}
        <Controller
          name="idRol"
          control={control}
          render={({field})=>(

            <CustomSelect
              field={field}
              data={dataRoles}
              label="Rol"
              getOptionLabel={(item)=>item.nombre}
              getOptionValue={(item)=>item.idRol}
              error={errors.idRol?.message}

            />

          )}
        />


        {/* ESTADO */}
        <Controller
          name="idEstadoUsuario"
          control={control}
          render={({field})=>(

            <CustomSelect
              field={field}
              data={dataEstados}
              label="Estado"
              getOptionLabel={(item)=>item.descripcion}
              getOptionValue={(item)=>item.idEstadoUsuario}
              error={errors.idEstadoUsuario?.message}

            />

          )}
        />


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