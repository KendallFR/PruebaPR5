import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useUser } from "@/hooks/useUser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

import { Save, ArrowLeft } from "lucide-react";

import UsuarioService from "../../services/UsuarioService";
import RolService from "../../services/RolService";

import { CustomSelect } from "../ui/custom/custom-select";

export function CreateUsuario() {

  const navigate = useNavigate();
  const { authorize } = useUser();

  const isAdmin = authorize(["Administrador"]);

  const [dataRoles, setDataRoles] = useState([]);
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [error, setError] = useState("");

  /** VALIDACIÓN */
  const usuarioSchema = yup.object({

    cedula: yup
      .string()
      .required("La cédula es requerida")
      .min(2,"La cédula debe tener 2 o más caracteres")
      .test(
        "cedula-existe",
        "Esta cédula ya está registrada",
        function(value){
          if(!value) return true;
          const existe = dataUsuarios.some((u)=>u.cedula === value);
          return !existe;
        }
      ),

    nombre: yup
      .string()
      .required("El nombre es requerido")
      .min(2,"El nombre debe tener 2 o más caracteres"),

    email: yup
      .string()
      .email("Ingrese un correo válido")
      .required("El correo es requerido")
      .test(
        "email-existe",
        "Este correo ya está registrado",
        function(value){
          if(!value) return true;
          const existe = dataUsuarios.some((u)=>u.email === value);
          return !existe;
        }
      ),

    password: yup
      .string()
      .required("La contraseña es requerida")
      .min(6,"La contraseña debe tener al menos 6 caracteres"),

    idRol: yup.string().required("Seleccione un rol")

  });

  const { control, handleSubmit, setValue, formState:{errors} } = useForm({

    defaultValues:{
      cedula:"",
      nombre:"",
      email:"",
      password:"",
      idRol:"2" // 👈 valor por defecto SIEMPRE
    },

    resolver:yupResolver(usuarioSchema)

  });

  /** CARGAR DATOS */
  useEffect(()=>{

    const fetchData = async ()=>{

      try{

        // 🔥 SOLO ADMIN CARGA ROLES
        if(isAdmin){
          const rolesRes = await RolService.getRoles();
          setDataRoles(rolesRes.data.data || []);
        }else{
          // 👇 Forzar rol 2 si NO es admin
          setValue("idRol","2");
        }

        const usuariosRes = await UsuarioService.getUsuarios();
        setDataUsuarios(usuariosRes.data.data || []);

      }catch(error){
        console.error(error);
        setError("Error cargando datos");
      }

    }

    fetchData();

  },[isAdmin, setValue]);

  /** SUBMIT */
  const onSubmit = async (dataForm) => {

    try {

      // 🔐 Seguridad extra
      if(!isAdmin){
        dataForm.idRol = 2;
      }

      const usuario = {
        ...dataForm,
        idRol: Number(dataForm.idRol)
      };

      console.log("FORM DATA", usuario);

      const response = await UsuarioService.createUsuario(usuario);

      if(response.data){

        const usuarioCreado = response.data.data;

        toast.success(`Usuario creado: ${usuarioCreado.nombre}`,{
          duration:3000
        });

        navigate("/usuario/table");
      }

    } catch (err) {
      console.error(err);
      toast.error("Error al crear usuario");
    }

  };

  if(error) return <p className="text-red-600">{error}</p>;

  return (

    <Card className="p-6 max-w-5xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">
        Crear Usuario
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* CEDULA */}
        <div>
          <Label>Cédula</Label>
          <Controller
            name="cedula"
            control={control}
            render={({field})=>(
              <Input
                {...field}
                placeholder="Ingrese la cédula"
                className={errors.cedula ? "border-red-500" : ""}
              />
            )}
          />
          {errors.cedula && (
            <p className="text-red-500 text-sm">{errors.cedula.message}</p>
          )}
        </div>

        {/* NOMBRE */}
        <div>
          <Label>Nombre</Label>
          <Controller
            name="nombre"
            control={control}
            render={({field})=>(
              <Input
                {...field}
                placeholder="Ingrese el nombre"
                className={errors.nombre ? "border-red-500" : ""}
              />
            )}
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <Label>Email</Label>
          <Controller
            name="email"
            control={control}
            render={({field})=>(
              <Input
                {...field}
                placeholder="Ingrese el email"
                className={errors.email ? "border-red-500" : ""}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <Label>Password</Label>
          <Controller
            name="password"
            control={control}
            render={({field})=>(
              <Input
                type="password"
                {...field}
                className={errors.password ? "border-red-500" : ""}
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* 🔥 SOLO ADMIN VE EL SELECT */}
        {isAdmin && (
          <div>
            <Label>Rol</Label>

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

            {errors.idRol && (
              <p className="text-red-500 text-sm">{errors.idRol.message}</p>
            )}
          </div>
        )}

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
            Guardar
          </Button>

        </div>

      </form>

    </Card>

  );
}