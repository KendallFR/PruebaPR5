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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const { control, handleSubmit, setValue, formState:{errors, isSubmitting} } = useForm({

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

    <div className="min-h-screen flex items-center justify-center">
  <Card className="w-full max-w-md shadow-lg border border-white/10 bg-white/10 backdrop-blur-lg text-white">
    
    <CardHeader>
      <CardTitle className="text-center text-2xl font-bold">
        Crear Cuenta
      </CardTitle>
    </CardHeader>

    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* CEDULA */}
        <div>
          <Label>Cédula</Label>
          <Controller
            name="cedula"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Tu cédula"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            )}
          />
          {errors.cedula && (
            <p className="text-red-300 text-sm mt-1">
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
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Tu nombre"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            )}
          />
          {errors.nombre && (
            <p className="text-red-300 text-sm mt-1">
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <Label>Correo electrónico</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="ejemplo@correo.com"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-300 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <Label>Contraseña</Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="********"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-300 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* 🔥 SOLO ADMIN VE EL SELECT */}
        {isAdmin && (
          <div>
            <Label>Rol</Label>

            <Controller
              name="idRol"
              control={control}
              render={({ field }) => (
                <CustomSelect
  field={field}
  data={dataRoles}
  label="rol"
  getOptionLabel={(item) => item.nombre}
  getOptionValue={(item) => item.idRol}
/>
              )}
            />

            {errors.idRol && (
              <p className="text-red-300 text-sm mt-1">
                {errors.idRol.message}
              </p>
            )}
          </div>
        )}

        {/* BOTÓN */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold mt-2"
        >
          {isSubmitting ? "Creando..." : "Crear cuenta"}
        </Button>

        {/* LINK LOGIN */}
        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/usuario/login"
            className="text-accent underline hover:text-accent/80"
          >
            Inicia sesión
          </a>
        </p>

      </form>
    </CardContent>
  </Card>
</div>

  );
}