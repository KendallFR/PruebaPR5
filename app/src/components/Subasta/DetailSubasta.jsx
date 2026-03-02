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

            <div className="flex justify-center gap-4 mt-4 flex-wrap">
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

          {/* IMAGEN */}
          <div className="relative w-full h-[500px] bg-gradient-to-br from-black via-[#0f172a] to-black flex items-center justify-center overflow-hidden">
            <img
              src={`${BASE_URL}/${data.carta.imagenes[0].imagen}`}
              alt={data.carta.nombre}
              className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* INFO */}
          <CardContent className="p-8 space-y-4 text-white relative z-10">

            <p className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-blue-400" />
              Carta: {data.carta.nombre}
            </p>

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

          </CardContent>

          {/* BOTON PUJAR */}
          <div className="flex justify-end border-t border-white/10 p-3 relative z-10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`/puja/${data.idSubasta}`}>
                    <Button
                      size="icon"
                      className="h-10 w-10 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg hover:scale-110 transition"
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