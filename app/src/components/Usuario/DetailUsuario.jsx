import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import { ErrorAlert } from "../ui/custom/ErrorAlert";
// Shadcn UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Clock,
    Globe,
    ArrowLeft,
    User
} from "lucide-react";
import { LoadingGrid } from '../ui/custom/LoadingGrid';
import { EmptyState } from '../ui/custom/EmptyState';

export function DetailUsuario() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [usuario, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UsuarioService.getUsuarioById(id);
                // Si la petición es exitosa, se guardan los datos
                console.log(response.data)
                setData(response.data);
                if(!response.data.success){
                    setError(response.data.message)
                }
            } catch (err) {
                // Si el error no es por cancelación, se registra
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                // Independientemente del resultado, se actualiza el loading
                setLoading(false);
            }
        };
        fetchData(id)
    }, [id]);


    if (loading) return <LoadingGrid count={1} type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar usuarios" message={error} />;
    if (!usuario || usuario.data.length === 0)
        return <EmptyState message="No se encontraron usuarios." />;
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Sección de los Detalles */}
                <div className="flex-1 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            {/* Nombre del usuario */}
                                <div className="flex items-center gap-4">
                                    <User className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Nombre:</span>
                                    <p className="text-muted-foreground">
                                        {usuario.data.nombre}
                                    </p>
                                </div>
                            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                                {/* Rol */}
                                <div className="flex items-center gap-4">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Rol:</span>
                                    <p className="text-muted-foreground">
                                        {usuario.data.rol.nombre}
                                    </p>
                                </div>
                                {/* Estado */}
                                <div className="flex items-center gap-4">
                                    <Globe className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Estado:</span>
                                    <p className="text-muted-foreground">
                                    {usuario.data.estadoUsuario.descripcion}
                                    </p>
                                </div>
                            {/* Fecha de Registro */}
                                <div className="flex items-center gap-4">
                                    <Globe className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Fecha de Registro:</span>
                                    <p className="text-muted-foreground">
                                    {usuario.data.fechaRegistro}
                                    </p>
                                </div>
                                {/* Campo calculado */}
                                {                          
  
  Number(usuario?.data?.cantidadSubastas) > 0 ? (
    <div className="flex items-center gap-4">
      <Globe className="h-5 w-5 text-primary" />
      <span className="font-semibold">
        Cantidad de Subastas Creadas:
      </span>
      <p className="text-muted-foreground">
        {usuario?.data?.cantidadSubastas}
      </p>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Globe className="h-5 w-5 text-primary" />
      <span className="font-semibold">
        Cantidad de Pujas Realizadas:
      </span>
      <p className="text-muted-foreground">
        {usuario?.data?.cantidadPujas}
      </p>
    </div>
  )
}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 bg-accent text-white hover:bg-accent/90 mt-6" 
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Regresar
                    </Button>
        </div>
    );
}