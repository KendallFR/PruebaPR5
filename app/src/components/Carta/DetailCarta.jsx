import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CartaService from '../../services/CartaService';
import { ErrorAlert } from "../ui/custom/ErrorAlert";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
    Globe,
    User,
    Film,
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

                setData(response.data);

                if (!response.data.success) {
                    setError(response.data.message);
                }

            } catch (err) {

                if (err.name !== "AbortError")
                    setError(err.message);

            } finally {

                setLoading(false);

            }

        };

        fetchData();

    }, [id]);


    /*
    ========================================
    COLOR DINAMICO
    ========================================
    */

    let glowColor = "rgba(59,130,246,0.6)";

    if (carta?.data?.categorias?.length) {

        const categoria = carta.data.categorias[0].descripcion.toLowerCase();

        if (categoria.includes("electrico"))
            glowColor = "rgba(255, 221, 0, 0.9)";
        else if (categoria.includes("fuego"))
            glowColor = "rgba(255, 60, 60, 0.9)";
        else if (categoria.includes("agua"))
            glowColor = "rgba(0, 140, 255, 0.9)";
        else if (categoria.includes("planta"))
            glowColor = "rgba(0, 255, 140, 0.9)";
        else if (categoria.includes("psiquico"))
            glowColor = "rgba(255, 0, 255, 0.9)";
    }


    /*
    ========================================
    ESTADOS
    ========================================
    */

    if (loading)
        return <LoadingGrid count={1} type="grid" />;

    if (error)
        return <ErrorAlert title="Error al cargar cartas" message={error} />;

    if (!carta || carta.data.length === 0)
        return <EmptyState message="No se encontraron cartas en esta tienda." />;


    return (

        <div className="max-w-5xl mx-auto py-12 px-4">

            <div
                className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01]"
                style={{
                    background: `
                        radial-gradient(circle at 20% 30%, ${glowColor}22, transparent 60%),
                        radial-gradient(circle at 80% 70%, ${glowColor}22, transparent 60%),
                        linear-gradient(145deg, #020617, #020617)
                    `,
                    boxShadow: `
                        0 0 25px ${glowColor}44,
                        inset 0 0 40px ${glowColor}22
                    `
                }}
            >

                <div className="flex flex-col md:flex-row gap-8 items-start p-6">

                    {/* IMAGENES */}
                    <div className="w-full md:w-1/2">

                        {carta?.data?.imagenes?.length > 0 ? (

                            <div className="grid grid-cols-2 gap-3">

                                {carta.data.imagenes.map((img) => (

                                    <img
                                        key={img.idImagen}
                                        src={`${BASE_URL}/${img.imagen}`}
                                        alt={carta.data.nombre}
                                        className="w-full h-full object-contain rounded-lg bg-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]"
                                    />

                                ))}

                            </div>

                        ) : (

                            <div className="w-full aspect-square bg-slate-900 flex items-center justify-center rounded-lg">
                                <Film className="w-12 h-12 text-gray-400" />
                            </div>

                        )}

                    </div>


                    {/* DETALLES */}
                    <div className="flex-1 space-y-6 text-white">

                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            {carta.data.carta}
                        </h1>

                        <Card className="bg-slate-950/60 backdrop-blur-xl border border-slate-800 shadow-inner">
                            <CardContent className="p-6 space-y-4">

                                {/* Nombre */}
                                <div className="flex items-center gap-4">
                                    <Globe className="text-red-400 w-5 h-5" />
                                    <span className="font-semibold">Carta:</span>
                                    <span className="text-gray-300">{carta.data.nombre}</span>
                                </div>

                                {/* DESCRIPCION */}
                                <div className="flex items-center gap-4">
                                    <Globe className="text-red-400 w-5 h-5" />
                                    <span className="font-semibold">Descripcion:</span>
                                    <span className="text-gray-300">{carta.data.descripcion}</span>
                                </div>

                                {/* CONDICION */}
                                <div className="flex items-center gap-4">
                                    <Globe className="text-red-400 w-5 h-5" />
                                    <span className="font-semibold">Condición:</span>
                                    <span className="text-gray-300">{carta.data.condicion.descripcion}</span>
                                </div>

                                {/* DISPONIBILIDAD */}
                                <div className="flex items-center gap-4">
                                    <Globe className="text-red-400 w-5 h-5" />
                                    <span className="font-semibold">Disponibilidad:</span>
                                    <span className="text-gray-300">{carta.data.estadoCarta.descripcion}</span>
                                </div>

                                {/* REGISTRO */}
                                <div className="flex items-center gap-4">
                                    <Globe className="text-red-400 w-5 h-5" />
                                    <span className="font-semibold">Registrado el:</span>
                                    <span className="text-gray-300">{carta.data.fechaRegistro}</span>
                                </div>

                                {/* PROPIETARIO */}
                                <div className="flex items-center gap-4">
                                    <User className="text-red-400 w-5 h-5" />
                                    <span className="font-semibold">Propietario:</span>
                                    <span className="text-gray-300">{carta.data.propietario.nombre}</span>
                                </div>

                                {/* CATEGORIAS */}
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Film className="w-5 h-5 text-red-400" />
                                        <span className="font-semibold">Categorias:</span>
                                    </div>

                                    {carta.data.categorias.map((categoria) => (
                                        <div key={categoria.idCategoria} className="flex items-center gap-2 ml-4">
                                            <ChevronRight
                                                className="w-4 h-4"
                                                style={{ color: glowColor }}
                                            />
                                            <span className="text-gray-300">
                                                {categoria.descripcion}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                            </CardContent>
                        </Card>

                    </div>

                </div>
            </div>

            <Button
                onClick={() => navigate(-1)}
                className="mt-6 bg-blue-700 hover:bg-blue-800 shadow-lg hover:shadow-[0_0_20px_rgba(0,140,255,0.7)] transition-all duration-300"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Regresar
            </Button>

        </div>
    );
}