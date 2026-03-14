import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import UsuarioService from "@/services/UsuarioService";

export function DeleteUsuario() {
  const navigate = useNavigate();
  const { id } = useParams(); // idUsuario de la URL

  useEffect(() => {
    const eliminarUsuario = async () => {
      if (!id) return;

      try {
        const usuario = { idUsuario: Number(id) }; // convertir a número
        await UsuarioService.deleteUsuario(usuario);

        toast.success("Usuario desactivado correctamente", { duration: 3000 });

        navigate("/usuario/table"); // volver a la tabla
      } catch (error) {
        console.error(error);
        toast.error("Error al desactivar el usuario");
        navigate("/usuario/table"); // volver aunque falle
      }
    };

    eliminarUsuario();
  }, [id, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-gray-700">Procesando desactivación del usuario...</p>
    </div>
  );
}