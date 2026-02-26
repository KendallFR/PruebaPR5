import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import {
  Globe,
  Info,
  FilmIcon,
  User,
  Zap,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

ListCardCartas.propTypes = {
  data: PropTypes.array,
};


/* ESTILOS POR TIPO */
const getTypeStyles = (categorias) => {

  if (!categorias || categorias.length === 0) {
    return {
      glow: "hover:shadow-white/40",
      ring: "group-hover:ring-white/50",
      badge: "bg-white/20 text-white",
      gradient: "from-white/10 via-white/5 to-transparent",
    };
  }

  const tipo = categorias[0].descripcion.toLowerCase();

  switch (tipo) {

    case "electrico":
      return {
        glow: "hover:shadow-yellow-400/80 hover:border-yellow-400/80",
        ring: "group-hover:ring-yellow-400/70",
        badge: "bg-yellow-400/20 text-yellow-300",
        gradient: "from-yellow-400/30 via-yellow-300/10 to-transparent",
      };

    case "fuego":
      return {
        glow: "hover:shadow-red-500/80 hover:border-red-500/80",
        ring: "group-hover:ring-red-500/70",
        badge: "bg-red-500/20 text-red-300",
        gradient: "from-red-500/30 via-red-400/10 to-transparent",
      };

    case "agua":
      return {
        glow: "hover:shadow-blue-500/80 hover:border-blue-500/80",
        ring: "group-hover:ring-blue-500/70",
        badge: "bg-blue-500/20 text-blue-300",
        gradient: "from-blue-500/30 via-blue-400/10 to-transparent",
      };

    case "planta":
      return {
        glow: "hover:shadow-green-500/80 hover:border-green-500/80",
        ring: "group-hover:ring-green-500/70",
        badge: "bg-green-500/20 text-green-300",
        gradient: "from-green-500/30 via-green-400/10 to-transparent",
      };

    default:
      return {
        glow: "hover:shadow-yellow-400/80",
        ring: "group-hover:ring-yellow-400/70",
        badge: "bg-yellow-400/20 text-yellow-300",
        gradient: "from-yellow-400/30 via-yellow-300/10 to-transparent",
      };
  }
};


export function ListCardCartas({ data }) {

  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  return (

    <div className="
      grid gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3
      min-h-screen
      bg-gradient-to-br
      from-[#020617]
      via-[#020617]
      to-[#0f172a]
    ">

      {data && data.map((item) => {

        const typeStyles = getTypeStyles(item.categorias);

        return (

          <Card
            key={item.idCarta}
            className={`
              group
              relative
              overflow-hidden
              border
              border-white/10
              bg-white/10
              backdrop-blur-xl
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-2
              rounded-2xl
              ${typeStyles.glow}
            `}
          >

            {/* ILUMINACION INTERNA */}
            <div className={`
              absolute inset-0
              opacity-0
              group-hover:opacity-100
              transition duration-500
              bg-gradient-to-br
              ${typeStyles.gradient}
              pointer-events-none
            `} />


            {/* BORDE ILUMINADO */}
            <div className={`
              absolute inset-0 rounded-2xl
              opacity-0 group-hover:opacity-100
              transition duration-300
              pointer-events-none
              ring-2
              ${typeStyles.ring}
              blur-[2px]
            `}/>


            {/* HEADER */}
            <CardHeader className="text-center pb-2 relative z-10">

              <CardTitle className="text-xl font-bold text-yellow-400 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                {item.nombre}
              </CardTitle>

              <p className="text-sm text-white/70">
                {item.condicion.descripcion}
              </p>

            </CardHeader>


            {/* IMAGEN */}
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


            {/* CONTENT */}
            <CardContent className="space-y-4 pt-4 text-white relative z-10">

              {/* propietario */}
              <div className="flex items-center gap-3">

                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <User className="w-4 h-4 text-blue-400" />
                </div>

                <div>
                  <p className="text-xs text-white/60">
                    Propietario
                  </p>

                  <p className="font-semibold">
                    {item.propietario.nombre}
                  </p>
                </div>

              </div>


              {/* categorias */}
              <div className="flex items-center gap-3">

                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <Zap className="w-4 h-4 text-yellow-400" />
                </div>

                <div>

                  <p className="text-xs text-white/60">
                    Categorías
                  </p>

                  <div className="flex flex-wrap gap-2 mt-1">

                    {item.categorias?.map((categoria, index) => (

                      <span
                        key={index}
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${typeStyles.badge}`}
                      >
                        {categoria.descripcion}
                      </span>

                    ))}

                  </div>

                </div>

              </div>


              {/* estado */}
              <div className="flex items-center gap-3">

                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Globe className="w-4 h-4 text-green-400" />
                </div>

                <div>

                  <p className="text-xs text-white/60">
                    Disponibilidad
                  </p>

                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-400/20 text-green-300">
                    {item.estadoCarta.descripcion}
                  </span>

                </div>

              </div>

            </CardContent>


            {/* BOTON */}
            <div className="flex justify-end border-t border-white/10 p-3 relative z-10">

              <TooltipProvider>

                <Tooltip>

                  <TooltipTrigger asChild>

                    <Link to={`/carta/detail/${item.idCarta}`}>

                      <Button
                        size="icon"
                        className="
                          rounded-full
                          bg-yellow-400
                          hover:bg-yellow-300
                          text-black
                          shadow-lg
                          hover:scale-110
                          transition
                        "
                      >
                        <Info className="w-4 h-4" />
                      </Button>

                    </Link>

                  </TooltipTrigger>

                  <TooltipContent>
                    Ver detalle
                  </TooltipContent>

                </Tooltip>

              </TooltipProvider>

            </div>

          </Card>

        );

      })}

    </div>

  );

}