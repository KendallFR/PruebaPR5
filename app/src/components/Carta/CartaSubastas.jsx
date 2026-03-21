import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CartaService from "../../services/CartaService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gavel, Sparkles, FilmIcon, Clock, Globe, TrendingUp } from "lucide-react";

export function CartaSubastas() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const BASE_URL    = import.meta.env.VITE_BASE_URL + "uploads";

  const [subastas, setSubastas] = useState([]);
  const [carta,    setCarta]    = useState(null);

  useEffect(() => {
    CartaService.getCartaById(id)
      .then((response) => {
        const data = response.data.data;
        setCarta(data);
        setSubastas(data.subasta || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!carta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1e] to-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Cargando historial...</p>
        </div>
      </div>
    );
  }

  const imagen = carta.imagenes?.[0]?.imagen;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1e] to-[#020617] px-4 py-10">

      {/* Blobs decorativos */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* BACK */}
        <div className="mb-7">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white/40 hover:text-white/80 flex items-center gap-2 pl-0 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver</span>
          </Button>
        </div>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
            <Gavel className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Historial de <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Subastas</span>
            </h1>
            <p className="text-white/30 text-xs tracking-widest uppercase mt-0.5">
              Pokémon TCG
            </p>
          </div>
        </div>

        {/* CARTA INFO — header card */}
        <div className="
          relative overflow-hidden
          rounded-3xl p-6 mb-6
          border border-white/[0.07]
          bg-[#0d1424]/90 backdrop-blur-xl
          shadow-2xl shadow-black/50
        ">
          {/* Barra superior */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
          {/* Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-6 flex-wrap relative z-10">

            {/* Imagen — borde TCG */}
            <div className="
              relative w-28 h-40 shrink-0
              rounded-[12px] overflow-hidden
              border-[3px] border-yellow-400/40
              shadow-[0_10px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.15)]
              ring-1 ring-black/50
              bg-[#0a0f1e]
            ">
              {imagen ? (
                <>
                  <img
                    src={`${BASE_URL}/${imagen}`}
                    alt={carta.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 right-0 h-[25%] bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/3 pointer-events-none" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/15">
                  <FilmIcon className="w-8 h-8" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <h2 className="text-xl font-black text-white truncate">{carta.nombre}</h2>
              </div>

              {carta.descripcion && (
                <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
                  {carta.descripcion}
                </p>
              )}

              {/* Stat subastas */}
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-4 py-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-yellow-400" />
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">Total subastas</p>
                    <p className="text-yellow-400 font-black text-lg leading-tight">{subastas.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLA */}
        <div className="
          relative overflow-hidden
          rounded-3xl
          border border-white/[0.07]
          bg-[#0d1424]/80 backdrop-blur-xl
          shadow-2xl shadow-black/50
        ">
          {/* Barra superior */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* THEAD */}
          <div className="grid grid-cols-4 px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
            {[
              { label: "ID",            icon: null },
              { label: "Precio Inicial", icon: null },
              { label: "Fecha Inicio",   icon: Clock },
              { label: "Fecha Cierre",   icon: Globe },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-1.5">
                {Icon && <Icon className="w-3 h-3" />}
                {label}
              </div>
            ))}
          </div>

          {/* ROWS */}
          {subastas.length > 0 ? (
            <div className="divide-y divide-white/[0.04]">
              {subastas.map((item) => (
                <div
                  key={item.idSubasta}
                  className="grid grid-cols-4 px-6 py-4 items-center hover:bg-white/[0.03] transition-colors duration-200 group"
                >
                  {/* ID */}
                  <div>
                    <span className="
                      bg-white/[0.05] border border-white/[0.08]
                      text-white/50 text-[11px] font-bold
                      px-2.5 py-1 rounded-lg
                    ">
                      #{item.idSubasta}
                    </span>
                  </div>

                  {/* Precio */}
                  <div>
                    <p className="text-yellow-400 font-black text-base">₡ {item.precio}</p>
                  </div>

                  {/* Fecha inicio */}
                  <div>
                    <p className="text-white/60 text-sm">{item.fechaInicio}</p>
                  </div>

                  {/* Fecha cierre */}
                  <div>
                    <p className="text-white/60 text-sm">{item.fechaCierre}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <Gavel className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-white/30 text-sm">Esta carta no ha participado en subastas</p>
            </div>
          )}

          {/* Footer */}
          {subastas.length > 0 && (
            <div className="px-6 py-3 border-t border-white/[0.04] bg-white/[0.01] flex items-center justify-between">
              <p className="text-white/20 text-[11px]">
                {subastas.length} subasta{subastas.length !== 1 ? "s" : ""} en total
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/10" />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
