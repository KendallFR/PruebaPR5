import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SubastaService from "@/services/SubastaService";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Sparkles,
  Clock,
  Zap,
  Globe,
  Gavel,
  Info,
  ArrowLeft,
  Film,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function DetailSubasta() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [subasta, setSubasta] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SubastaService.getSubastaById(id);
        setSubasta(response.data.data);
      } catch (err) {
        console.error("Error al cargar la subasta", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Cargando detalle...
      </div>
    );

  const data = subasta;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] p-8">
      <div className="max-w-5xl mx-auto space-y-10">

        <Card className="relative overflow-hidden border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl">

  <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-yellow-400/20 via-purple-500/10 to-transparent pointer-events-none" />

  <CardHeader className="text-center relative z-10 pb-4">
    <CardTitle className="text-3xl font-bold text-yellow-400 flex items-center justify-center gap-3">
      <Sparkles className="w-6 h-6" />
      Subasta #{data.idSubasta}
    </CardTitle>

    <div className="flex justify-center gap-3 mt-4 flex-wrap">
      <Badge className="bg-yellow-400 text-black px-4 py-1 text-sm shadow-md">
        Precio: ${data.precio}
      </Badge>

      <Badge className="bg-purple-500 text-white px-4 py-1 text-sm shadow-md">
        Incremento: ${data.incrementoMin}
      </Badge>

      <Badge className="bg-green-500 text-white px-4 py-1 text-sm shadow-md">
        Pujas: {data.cantidadPujas}
      </Badge>
    </div>
  </CardHeader>

  {/* CONTENIDO */}
<div className="grid md:grid-cols-2 gap-8 p-8">

  {/* IMAGEN */}
  <div className="flex items-center justify-center">

    {data.carta?.imagenes?.length > 0 ? (

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">

        {data.carta.imagenes.map((img) => (

          <img
            key={img.idImagen}
            src={`${BASE_URL}/${img.imagen}`}
            alt={data.carta.nombre}
            className="w-full aspect-[3/4] object-contain rounded-lg transition-all duration-300 hover:scale-105"
          />

        ))}

      </div>

    ) : (

      <div className="w-full aspect-[3/4] flex items-center justify-center rounded-lg">
        <Film className="w-12 h-12 text-gray-400" />
      </div>

    )}

  </div>


  {/* INFO */}
  <CardContent className="p-0 space-y-6 text-white relative z-10">

    {/* DATOS CARTA */}
    <div className="p-5 rounded-xl border border-white/10 bg-white/5 space-y-4">

      <p className="flex items-center gap-2 text-lg">
        <Zap className="w-5 h-5 text-blue-400" />
        Carta: {data.carta.nombre}
      </p>

      {/* CATEGORÍAS */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Film className="w-5 h-5 text-red-400" />
          <span className="font-semibold">Categorías:</span>
        </div>

        <div className="space-y-1">
          {data.carta.categorias.map((categoria) => (
            <div
              key={categoria.idCategoria}
              className="flex items-center gap-2 ml-4 text-gray-300"
            >
              <ChevronRight className="w-4 h-4" />
              {categoria.descripcion}
            </div>
          ))}
        </div>
      </div>

      <p className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-blue-400" />
        Condición: {data.carta.condicion.descripcion}
      </p>

    </div>


    {/* DATOS SUBASTA */}
    <div className="p-5 rounded-xl border border-white/10 bg-white/5 space-y-4">

      <p className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-400" />
        Fecha inicio: {data.fechaInicio}
      </p>

      <p className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-green-400" />
        Fecha cierre: {data.fechaCierre}
      </p>

      <p className="flex items-center gap-2 font-semibold">
        <Gavel className="w-5 h-5" />
        Estado: {data.estadoSubasta.descripcion}
      </p>

    </div>

  </CardContent>

</div>

  {/* BOTÓN */}
  <div className="flex justify-end border-t border-white/10 p-4 relative z-10">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={`/puja/table/${data.idSubasta}`}
          >
            <Button
              size="icon"
              className="h-11 w-11 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg hover:scale-110 transition"
            >
              <Info className="w-5 h-5" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>Ver historial de pujas</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>

</Card>

        {/* BOTON REGRESAR */}
        <Button
          onClick={() => navigate(-1)}
          className="bg-blue-700 hover:bg-blue-800 shadow-lg transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Regresar
        </Button>

      </div>
    </div>
  );
}