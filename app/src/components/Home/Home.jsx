import ticketImg from "../../assets/pokemon.jpg";
import { Sparkles, Zap, Trophy } from "lucide-react";

export function Home() {
  return (
    <div className="relative w-full min-h-screen flex  items-center justify-center text-center overflow-hidden">

      {/* Fondo */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `url(${ticketImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.35)",
        }}
      />

      {/* Overlay oscuro  */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Auras suaves */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl top-20 left-20" />
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-10 right-10" />
      </div>

      {/* Contenido */}
      <div className="max-w-3xl px-6 text-white space-y-8">

        {/* Título */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-yellow-400">
            Subastas Pokémon
          </span>
        </h1>

        {/* Texto */}
        <p className="text-lg text-gray-300 leading-relaxed">
          Entra a la arena y compite por las cartas más legendarias.
          Haz tu mejor oferta y conviértete en el entrenador campeón.
        </p>

        {/* Botones  */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">

          <a
            href="/movies"
            className="px-8 py-3 rounded-2xl font-semibold text-base bg-yellow-400 hover:bg-yellow-500 text-black transition duration-300 shadow-lg"
          >
            <span className="flex items-center gap-2 justify-center">
              <Zap className="w-4 h-4" />
              Ver Catálogo
            </span>
          </a>

          <a
            href="/user/login"
            className="px-8 py-3 rounded-2xl font-semibold text-base bg-purple-600 hover:bg-purple-700 text-white transition duration-300 shadow-lg"
          >
            <span className="flex items-center gap-2 justify-center">
              <Trophy className="w-4 h-4" />
              Iniciar Sesión
            </span>
          </a>

        </div>

        {/* Frase final  */}
        <div className="pt-6 text-yellow-400 text-sm flex items-center justify-center gap-2 opacity-80">
          <Sparkles className="w-4 h-4" />
          ¡Que comience las Subastas
        </div>

      </div>
    </div>
  );
}