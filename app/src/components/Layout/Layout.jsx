import { useEffect, useRef } from "react";
import Header from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import UserProvider from "@/context/UserProvider";

// ─── Partículas doradas flotantes ─────────────────────────────────────────────
function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    const ctx = c.getContext("2d");

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.6,
      da: (Math.random() - 0.5) * 0.008,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(Math.random() * 0.25 + 0.05),
      gold: Math.random() > 0.3,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      particles.forEach(p => {
        p.a = Math.max(0.02, Math.min(0.65, p.a + p.da));
        if (Math.random() < 0.005) p.da *= -1;
        p.x += p.vx; p.y += p.vy;
        if (p.y < -5) { p.y = c.height + 5; p.x = Math.random() * c.width; }
        if (p.x < -5) p.x = c.width + 5;
        if (p.x > c.width + 5) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(255,204,0,${p.a})`
          : `rgba(180,100,255,${p.a * 0.6})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={ref} style={{
      position: "fixed", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 1, opacity: 0.7,
    }}/>
  );
}

// ─── Grid hexagonal de fondo ──────────────────────────────────────────────────
function HexGrid() {
  return (
    <svg
      style={{
        position: "fixed", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 0.04,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
          <polygon
            points="28,2 52,14 52,34 28,46 4,34 4,14"
            fill="none" stroke="rgba(255,204,0,1)" strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)"/>
    </svg>
  );
}

// ─── Orbes de luz animados ─────────────────────────────────────────────────────
function LightOrbs() {
  return (
    <>
      <style>{`
        @keyframes orbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); opacity:.18; }
          33%      { transform: translate(60px,-40px) scale(1.1); opacity:.28; }
          66%      { transform: translate(-30px,30px) scale(.95); opacity:.15; }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,0) scale(1); opacity:.12; }
          40%      { transform: translate(-80px,50px) scale(1.15); opacity:.22; }
          70%      { transform: translate(40px,-20px) scale(.9); opacity:.1; }
        }
        @keyframes orbFloat3 {
          0%,100% { transform: translate(0,0) scale(1); opacity:.1; }
          50%      { transform: translate(30px,60px) scale(1.2); opacity:.2; }
        }
        .orb1 { animation: orbFloat1 18s ease-in-out infinite; }
        .orb2 { animation: orbFloat2 24s ease-in-out infinite; animation-delay: -8s; }
        .orb3 { animation: orbFloat3 20s ease-in-out infinite; animation-delay: -14s; }

        /* Línea scan horizontal que baja lentamente */
        @keyframes scanDown {
          0%   { transform: translateY(-100vh); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .scan-h { animation: scanDown 12s linear infinite; animation-delay: 3s; }

        /* Noise overlay */
        @keyframes noiseShift {
          0%,100% { background-position: 0 0; }
          25%  { background-position: 10% 5%; }
          50%  { background-position: 5% 10%; }
          75%  { background-position: -5% 5%; }
        }
      `}</style>

      {/* Orbe dorado — esquina top-left */}
      <div className="orb1" style={{
        position: "fixed", top: "-10%", left: "-8%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(255,204,0,.35) 0%,rgba(255,150,0,.15) 40%,transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
      }}/>

      {/* Orbe morado — esquina bottom-right */}
      <div className="orb2" style={{
        position: "fixed", bottom: "-15%", right: "-10%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(124,58,237,.4) 0%,rgba(88,28,135,.2) 45%,transparent 70%)",
        filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
      }}/>

      {/* Orbe azul — centro */}
      <div className="orb3" style={{
        position: "fixed", top: "40%", left: "45%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(30,58,138,.3) 0%,rgba(15,23,42,.1) 50%,transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
        transform: "translate(-50%,-50%)",
      }}/>

      {/* Línea de scan horizontal */}
      <div className="scan-h" style={{
        position: "fixed", left: 0, right: 0, height: 1.5,
        background: "linear-gradient(90deg,transparent,rgba(255,204,0,.08),rgba(180,100,255,.06),transparent)",
        pointerEvents: "none", zIndex: 1,
      }}/>
    </>
  );
}

// ─── LAYOUT ───────────────────────────────────────────────────────────────────
export function Layout() {
  return (
    <UserProvider>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        /* Scrollbar personalizada */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(3,2,12,.9); }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,rgba(255,204,0,.5),rgba(124,58,237,.5));
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg,rgba(255,204,0,.8),rgba(124,58,237,.8)); }

        /* Selección de texto */
        ::selection { background: rgba(255,204,0,.25); color: #fff; }

        html, body { background: #03020c; }
      `}</style>

      {/* ── Capa base de fondo ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -1,
        background: "linear-gradient(135deg,#03020c 0%,#05041a 35%,#080520 65%,#030212 100%)",
      }}/>

      {/* ── Efectos de fondo ── */}
      <HexGrid />
      <LightOrbs />
      <ParticleField />

      {/* ── Contenedor principal — SIN overflow hidden para que dropdowns funcionen ── */}
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", zIndex: 2 }}>

        <Header />

        <main style={{ flex: 1, paddingTop: 70 }}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </UserProvider>
  );
}