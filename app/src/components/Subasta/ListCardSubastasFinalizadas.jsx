import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Globe, Info, FilmIcon, Zap, Sparkles, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

ListCardSubastasFinalizadas.propTypes = {
  data: PropTypes.array,
};

export function ListCardSubastasFinalizadas({ data }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  return (
    <div className="grid gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3 min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]">
      {data && data.map((item) => (
        <Card
          key={item.idSubasta}
          className="group relative overflow-hidden border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl"
        >
          {/* ILUMINACION INTERNA */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none ring-2 ring-white/20 blur-[2px]" />

          {/* HEADER SUBASTA */}
          <CardHeader className="text-center pb-2 relative z-10">
            <CardTitle className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Subasta #{item.idSubasta}
            </CardTitle>
            <p className="text-sm text-white/70">
              Precio: ${item.precio} | Incremento mínimo: ${item.incrementoMin}
            </p>
          </CardHeader>

          {/* IMAGEN CARTA */}
          <div className="relative w-full aspect-video">
            {item.carta?.imagenes && item.carta.imagenes.length > 0 ? (
              <div className="grid h-full w-full grid-cols-2 gap-1 auto-rows-fr">
                {item.carta.imagenes.map((img, index) => (
                  <img
                    key={index}
                    src={`${BASE_URL}/${img.imagen}`}
                    alt={`${item.carta?.nombre}-${index}`}
                    className="w-full h-full object-cover"
                  />
                ))}
              </div>
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                <FilmIcon className="h-1/2 w-1/2" />
              </div>
            )}
          </div>

          {/* DATOS DETALLADOS */}
          <CardContent className="space-y-3 pt-4 text-white relative z-10">
            <p className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-purple-400" />
              Fecha de inicio: {item.fechaInicio}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-green-400" />
              Fecha de cierre: {item.fechaCierre}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-blue-400" />
              Carta: {item.carta?.nombre}
            </p>
          </CardContent>

          {/* BOTON DETALLE */}
          <div className="flex justify-end border-t border-white/10 p-3 relative z-10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`/subasta/detail/${item.idSubasta}`}>
                    <Button
                      size="icon"
                      className="h-10 w-10 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg hover:scale-110 transition"
                    >
                      <Info className="w-5 h-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Ver detalle</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      ))}
    </div>
  );
}


