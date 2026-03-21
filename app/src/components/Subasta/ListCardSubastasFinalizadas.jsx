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
  Zap,
  Sparkles,
  Clock,
  User,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

ListCardSubastasFinalizadas.propTypes = {
  data: PropTypes.array,
};

/* ══════════════════════════════════════
   BADGE DE ESTADO
══════════════════════════════════════ */
function EstadoBadge({ descripcion }) {
  const styles = {
    Activa:     "bg-green-500/20 text-green-300 border-green-500/40",
    Finalizada: "bg-red-500/20 text-red-300 border-red-500/40",
    Cancelada:  "bg-orange-500/20 text-orange-300 border-orange-500/40",
    Pausada:    "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[descripcion] ?? "bg-white/10 text-white/60 border-white/20"}`}>
      {descripcion}
    </span>
  );
}
EstadoBadge.propTypes = { descripcion: PropTypes.string };

/* ══════════════════════════════════════
   IMAGEN CARTA — estilo TCG
══════════════════════════════════════ */
function CartaImageTCG({ carta, BASE_URL }) {
  if (!carta?.imagenes?.length) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/15">
        <FilmIcon className="w-12 h-12" />
      </div>
    );
  }
  return (
    <img
      src={`${BASE_URL}/${carta.imagenes[0].imagen}`}
      alt={carta.nombre}
      className="w-full h-full object-cover"
    />
  );
}
CartaImageTCG.propTypes = {
  carta: PropTypes.shape({
    nombre:   PropTypes.string,
    imagenes: PropTypes.arrayOf(PropTypes.shape({ imagen: PropTypes.string })),
  }),
  BASE_URL: PropTypes.string,
};

/* ══════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════ */
export function ListCardSubastasFinalizadas({ data }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL + "uploads";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]">

      {/* HEADER */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-white/90 tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-white/40" />
          Subastas Finalizadas
        </h1>
      </div>

      {/* GRID */}
      <div className="grid gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {data && data.map((item) => (
          <Card
            key={item.idSubasta}
            className="
              group relative overflow-hidden
              border border-white/10 bg-white/10
              backdrop-blur-xl shadow-xl
              transition-all duration-300 hover:-translate-y-2
              rounded-2xl
              opacity-80
              hover:opacity-100
            "
          >
            {/* Glow hover sutil — gris para finalizadas */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/8 via-white/3 to-transparent pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none ring-2 ring-white/15 blur-[2px]" />

            {/* Badge estado — top left */}
            <div className="absolute top-3 left-3 z-20">
              <EstadoBadge descripcion={item.estadoSubasta?.descripcion} />
            </div>

            {/* ID — top right */}
            <div className="absolute top-3 right-3 z-20 bg-black/50 text-white/50 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
              #{item.idSubasta}
            </div>

            {/* HEADER */}
            <CardHeader className="text-center pb-2 pt-10 relative z-10">
              <CardTitle className="text-xl font-bold text-white/60 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                {item.carta?.nombre ?? `Subasta #${item.idSubasta}`}
              </CardTitle>
            </CardHeader>

            {/* IMAGEN — mismo estilo TCG */}
            <div className="flex justify-center px-4 py-3">
              <div className="
                relative w-44 h-64
                rounded-[14px] overflow-hidden
                border-[3px] border-white/20
                shadow-[0_10px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.10)]
                ring-1 ring-black/50
                bg-[#0a0f1e]
                transition-all duration-300
                group-hover:border-white/35
                group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.15)]
                grayscale-[20%]
              ">
                <CartaImageTCG carta={item.carta} BASE_URL={BASE_URL} />
                <div className="absolute top-0 left-0 right-0 h-[25%] bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/8 via-transparent to-white/3 transition-opacity duration-300 pointer-events-none" />
                {/* Overlay de finalizada */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              </div>
            </div>

            {/* CONTENT */}
            <CardContent className="space-y-3 pt-2 pb-4 text-white relative z-10 px-5">

              {/* Precio + Incremento */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/[0.03] rounded-xl px-3 py-2 border border-white/6">
                  <p className="text-white/30 text-[10px] uppercase tracking-widest">Precio base</p>
                  <p className="text-white/50 font-bold text-sm">${item.precio}</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl px-3 py-2 border border-white/6">
                  <p className="text-white/30 text-[10px] uppercase tracking-widest">Incremento</p>
                  <p className="text-white/50 font-bold text-sm">${item.incrementoMin}</p>
                </div>
              </div>

              {/* Pujas */}
              <div className="bg-white/[0.03] rounded-xl px-3 py-2 border border-white/6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-white/30 shrink-0" />
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest">Pujas totales</p>
                  <p className="text-white/60 font-semibold text-sm">{item.cantidadPujas}</p>
                </div>
              </div>

              {/* Fechas */}
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-xs text-white/40">
                  <Clock className="w-3.5 h-3.5 text-white/25 shrink-0" />
                  Inicio: <span className="text-white/50">{item.fechaInicio}</span>
                </p>
                <p className="flex items-center gap-2 text-xs text-white/40">
                  <Globe className="w-3.5 h-3.5 text-white/25 shrink-0" />
                  Cierre: <span className="text-white/50">{item.fechaCierre}</span>
                </p>
              </div>

              {/* Creador */}
              {item.creador && (
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <User className="w-3.5 h-3.5 text-white/25 shrink-0" />
                  Creador: <span className="text-white/55 font-semibold">{item.creador?.nombre ?? "—"}</span>
                </div>
              )}

              {/* Categorías */}
              {item.carta?.categorias?.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Zap className="w-3.5 h-3.5 text-white/25 shrink-0" />
                  {item.carta.categorias.map((cat, i) => (
                    <span key={i} className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/8 text-white/40 border border-white/10">
                      {cat.descripcion}
                    </span>
                  ))}
                </div>
              )}

            </CardContent>

            {/* BOTÓN DETALLE */}
            <div className="flex justify-end border-t border-white/[0.06] p-3 relative z-10 bg-white/[0.03] backdrop-blur-md">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={`/subasta/detail/${item.idSubasta}`}>
                      <Button
                        size="icon"
                        className="rounded-full bg-white/10 hover:bg-yellow-400 border border-white/15 hover:border-yellow-400 text-white/50 hover:text-black shadow-lg hover:scale-110 transition-all duration-200"
                      >
                        <Info className="w-4 h-4" />
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
    </div>
  );
}
