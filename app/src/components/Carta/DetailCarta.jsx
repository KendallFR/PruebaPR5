import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CartaService from '../../services/CartaService';
import { ErrorAlert } from "../ui/custom/ErrorAlert";
// Shadcn UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Clock,
    Globe,
    User,
    Film,
    Star,
    ChevronRight,
    ArrowLeft
} from "lucide-react";
import { LoadingGrid } from '../ui/custom/LoadingGrid';
import { EmptyState } from '../ui/custom/EmptyState';

export function DetailCarta() {
    const navigate = useNavigate();
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_BASE_URL + 'uploads';
    const [carta, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CartaService.getCartaById(id);
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
    if (error) return <ErrorAlert title="Error al cargar cartas" message={error} />;
    if (!carta || carta.data.length === 0)
        return <EmptyState message="No se encontraron cartas en esta tienda." />;
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Sección de la Imagen */}
                <div className="w-full md:w-1/2">
  {carta?.data?.imagenes?.length > 0 ? (
    <div className="grid grid-cols-2 gap-2">
      {carta.data.imagenes.map((img) => (
        <img
          key={img.idImagen}
          src={`${BASE_URL}/${img.imagen}`}
          alt={carta.data.nombre}
          className="w-full h-full object-contain rounded-lg bg-white"
        />
      ))}
    </div>
  ) : (
    <div className="w-full aspect-square bg-muted flex items-center justify-center rounded-lg">
      <Film className="w-12 h-12 text-muted-foreground" />
    </div>
  )}
</div>
                {/* Sección de los Detalles */}
                <div className="flex-1 space-y-6">
                    {/* Título de la carta */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            {carta.data.carta}
                        </h1>
                    </div>

                    <Card>
                        <CardContent className="p-6 space-y-6">
                            {/* Información */}
                            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                                {/* descripcion */}
                                <div className="flex items-center gap-4">
                                    <User className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Descripcion:</span>
                                    <p className="text-muted-foreground">
                                        {carta.data.descripcion}
                                    </p>
                                </div>
                                {/* Condicion */}
                                <div className="flex items-center gap-4">
                                    <Globe className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Condición:</span>
                                    <p className="text-muted-foreground">
                                    {carta.data.condicion.descripcion}
                                    </p>
                                </div>
                                {/* Disponibilidad */}
                                <div className="flex items-center gap-4">
                                    <Globe className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Disponibilidad:</span>
                                    <p className="text-muted-foreground">
                                    {carta.data.estadoCarta.descripcion}
                                    </p>
                                </div>
                                {/* Registro */}
                                <div className="flex items-center gap-4">
                                    <Globe className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Registrado el:</span>
                                    <p className="text-muted-foreground">
                                    {carta.data.fechaRegistro}
                                    </p>
                                </div>
                                {/* Propietario */}
                                <div className="flex items-center gap-4">
                                    <Globe className="h-5 w-5 text-primary" />
                                    <span className="font-semibold">Propietario:</span>
                                    <p className="text-muted-foreground">
                                    {carta.data.propietario.nombre}
                                    </p>
                                </div>
                            </div>

                            {/* Contenedor de dos columnas para géneros y actores */}
                            <div className="grid gap-4 md:grid-cols-2">
                            {carta.data.categorias && carta.data.categorias.length > 0 && ( 
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <Film className="h-5 w-5 text-primary" />
                                            <span className="font-semibold">Categorias:</span>
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            
                                                {carta.data.categorias.map((categoria)=>(
                                                <div key={categoria.idCategoria}  className="flex items-center gap-2 py-1 px-2 text-sm">
                                                    <ChevronRight className="h-4 w-4 text-secondary" />
                                                    <span className="text-muted-foreground">
                                                        {categoria.descripcion}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
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