import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/UserService";

export default function UserDetail() {

  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getUserById(id)
      .then(response => {
        setUser(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-white text-lg animate-pulse">
          Cargando información del usuario...
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-[60vh] px-4">

      <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800">

        {/* Header */}
        <div className="bg-zinc-800 px-6 py-4 rounded-t-2xl border-b border-zinc-700">
          <h2 className="text-2xl font-semibold text-white">
            Detalle del Usuario
          </h2>
          <p className="text-sm text-zinc-400">
            Información completa del usuario seleccionado
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-zinc-400 text-sm">ID</p>
              <p className="text-white font-medium">{user.idUsuario}</p>
            </div>

            <div>
              <p className="text-zinc-400 text-sm">Cédula</p>
              <p className="text-white font-medium">{user.cedula}</p>
            </div>

            <div className="col-span-2">
              <p className="text-zinc-400 text-sm">Nombre</p>
              <p className="text-white font-medium">{user.nombre}</p>
            </div>

            <div className="col-span-2">
              <p className="text-zinc-400 text-sm">Correo Electrónico</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>

            <div>
              <p className="text-zinc-400 text-sm">Rol</p>
              <p className="text-white font-medium">
                {user.rol?.nombre || "No asignado"}
              </p>
            </div>

            <div>
              <p className="text-zinc-400 text-sm">Estado</p>
              <p className="text-white font-medium">
                {user.estadoUsuario?.descripcion || "No asignado"}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-zinc-400 text-sm">Fecha de Registro</p>
              <p className="text-white font-medium">
                {new Date(user.fechaRegistro).toLocaleString()}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}