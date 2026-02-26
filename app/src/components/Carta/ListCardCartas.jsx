import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Clock, Globe, Info, FilmIcon } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

ListCardCartas.propTypes = {
  data: PropTypes.array,
};

export function ListCardCartas({ data }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";
  return (
    <div className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {data && data.map((item) => (
        <Card key={item.idCarta} className="flex flex-col overflow-hidden">
          {/* Header */}
          <CardHeader className="text-secondary text-center">
            <CardTitle className="text-lg font-semibold">
              {item.nombre}
            </CardTitle>
            <p className="text-sm opacity-80">{item.condicion.descripcion}</p>
          </CardHeader>

          {/* Imagen */}
<div className="relative w-full aspect-video">
  {item.imagenes && item.imagenes.length > 0 ? (
    <div className="grid h-full w-full grid-cols-2 gap-1 auto-rows-fr">
      {item.imagenes.map((img, index) => (
        <img
          key={index}
          src={`${BASE_URL}/${img.imagen}`}
          alt={`${item.nombre}-${index}`}
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
          {/* Contenido */}
          <CardContent className="flex-1 space-y-2 pt-4">
            <h1 className="text-lg font-semibold">Propietario</h1>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              {item.propietario.nombre}
            </p>
            <h1 className="text-lg font-semibold">Categorías</h1>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            {item.categorias?.map(categoria => categoria.descripcion).join(", ")}
            </p>
            <h1 className="text-lg font-semibold">Disponibilidad</h1>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 text-secondary" />
              {item.estadoCarta.descripcion}
            </p>
          </CardContent>

          {/* Acciones */}
          <div className="flex justify-end gap-2 border-t p-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon" className="size-8"
                  >
                    <Link to={`/carta/detail/${item.idCarta}`}>
                      <Info />
                    </Link>
                  </Button>
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
