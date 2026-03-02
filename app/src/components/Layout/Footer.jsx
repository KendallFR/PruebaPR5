import { Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-gradient-to-b from-black to-slate-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          {/* BRAND */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white tracking-tight">
              RedCard Market Trading
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Plataforma profesional de subastas para cartas coleccionables.
              Transparencia, seguridad y competencia en tiempo real.
            </p>
          </div>

          {/* LINKS */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/movies" className="hover:text-yellow-400 transition-colors duration-200">
                Catálogo
              </a>
              <a href="/subastas" className="hover:text-yellow-400 transition-colors duration-200">
                Subastas
              </a>
              <a href="/user/login" className="hover:text-yellow-400 transition-colors duration-200">
                Iniciar Sesión
              </a>
            </div>
          </div>

          {/* CONTACTO / INFO */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Información
            </h4>

            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs text-gray-500 pt-2">
              ISW-613 • {new Date().getFullYear()}
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} RedCard Market Trading. 
          Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
}