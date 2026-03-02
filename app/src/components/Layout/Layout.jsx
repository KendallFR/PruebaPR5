import Header from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">

      {/* IMAGEN DE FONDO */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/tu-imagen.jpg')" }}
      />

      {/* OVERLAY AZUL NOCHE */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#020617]/85 to-[#0f172a]/95" />

      {/* CONTENIDO */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}