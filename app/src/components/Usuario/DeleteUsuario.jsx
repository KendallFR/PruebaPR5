import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import UsuarioService from "@/services/UsuarioService";
import EstadoUsuarioService from "@/services/EstadoUsuarioService";

export function DeleteUsuario() {
  const navigate = useNavigate();
  const { id }   = useParams();

  useEffect(() => {
    const bloquear = async () => {
      if (!id) return;
      try {
        // Cargar estados del backend — sin hardcodear ids
        const estRes  = await EstadoUsuarioService.getEstadoUsuarios();
        const estados = estRes.data?.data ?? estRes.data ?? [];

        const idBloqueado = estados.find(
          (e) => e.descripcion === "Bloqueado"
        )?.idEstadoUsuario;

        if (!idBloqueado) {
          toast.error("Estado 'Bloqueado' no encontrado");
          navigate("/usuario/table");
          return;
        }

        await UsuarioService.updateEstadoUsuario({
          idUsuario:       Number(id),
          idEstadoUsuario: idBloqueado,
        });

        toast.success("Usuario bloqueado correctamente");
      } catch (err) {
        console.error(err);
        toast.error("Error al bloquear el usuario");
      } finally {
        navigate("/usuario/table");
      }
    };

    bloquear();
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1e] to-[#020617] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="w-8 h-8 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
        <p className="text-white/30 text-sm tracking-widest uppercase">Procesando...</p>
      </div>
    </div>
  );
}
