import React, { useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { InView } from "react-intersection-observer";
import * as random from "maath/random/dist/maath-random.esm";
import { Zap, Trophy, Sparkles, Flame, Shield } from "lucide-react";
import ticketImg from "../../assets/fondo pokemon.jpg";

// ─── Motion Variants ──────────────────────────────────────────────────────────

function slideInFromLeft(delay) {
  return {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };
}

function slideInFromRight(delay) {
  return {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };
}

const slideInFromTop = {
  hidden: { y: -60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInUp = (delay) => ({
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

// ─── Partículas Three.js ──────────────────────────────────────────────────────

const PokeParticles = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(4000), { radius: 1.3 })
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffcc00"
          size={0.0018}
          sizeAttenuation
          depthWrite={false}
          opacity={0.7}
        />
      </Points>
    </group>
  );
};

const ParticlesCanvas = () => (
  <div className="w-full h-full absolute inset-0 z-[5]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <PokeParticles />
      </Suspense>
    </Canvas>
  </div>
);

// ─── Pokéball decorativa ──────────────────────────────────────────────────────

const PokeballDecor = () => (
  <motion.div
    className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.035] z-[6] pointer-events-none"
    animate={{ rotate: 360 }}
    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
  >
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="96" stroke="white" strokeWidth="4" />
      <line x1="4" y1="100" x2="196" y2="100" stroke="white" strokeWidth="4" />
      <circle cx="100" cy="100" r="24" stroke="white" strokeWidth="4" />
      <circle cx="100" cy="100" r="13" fill="white" />
    </svg>
  </motion.div>
);

// ─── Orbes de energía ────────────────────────────────────────────────────────

const EnergyOrbs = () => (
  <div className="absolute inset-0 pointer-events-none z-[4]">
    <motion.div
      className="absolute w-96 h-96 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(255,204,0,0.12) 0%, transparent 70%)",
        top: "10%",
        left: "-5%",
        filter: "blur(40px)",
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
        bottom: "-10%",
        right: "-5%",
        filter: "blur(50px)",
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
    <motion.div
      className="absolute w-64 h-64 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 70%)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        filter: "blur(30px)",
      }}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
  </div>
);

// ─── HOME ─────────────────────────────────────────────────────────────────────

export function Home() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden bg-[#050508]">

      {/* Fondo imagen oscurecida */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: `url(${ticketImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.2) saturate(0.8)",
        }}
      />

      {/* Overlay gradiente */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* Grid animado */}
      <div
        className="absolute inset-0 z-[3] opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,204,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,204,0,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "gridScroll 20s linear infinite",
        }}
      />

      <EnergyOrbs />
      <ParticlesCanvas />
      <PokeballDecor />

      {/* Contenido */}
      <div className="relative z-[20] w-full max-w-3xl px-6 flex flex-col gap-7">

        {/* Badges */}
        <InView triggerOnce={false}>
          {({ inView, ref }) => (
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={slideInFromTop}
              className="flex flex-wrap justify-center gap-3"
            >
              {[
                { icon: <Flame className="w-3.5 h-3.5" />, label: "Subastas en vivo" },
                { icon: <Shield className="w-3.5 h-3.5" />, label: "Cartas Holográficas" },
                { icon: <Sparkles className="w-3.5 h-3.5" />, label: "Temporada 2026" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center py-[7px] px-[12px] rounded-full border border-[#ffcc0030] backdrop-blur-sm"
                  style={{ background: "rgba(255,204,0,0.05)" }}
                >
                  <span className="text-yellow-400 mr-2 flex items-center">{icon}</span>
                  <span
                    className="text-[12px] font-semibold tracking-wide"
                    style={{
                      background: "linear-gradient(90deg, #ffcc00, #ffd700, #ffaa00)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </InView>

        {/* Título */}
        <InView triggerOnce={false}>
          {({ inView, ref }) => (
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={slideInFromLeft(0.3)}
            >
              <p
                className="text-[11px] uppercase tracking-[0.3em] mb-3"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                La arena definitiva
              </p>
              <h1
                className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                <span className="text-white">SUBASTAS </span>
                <span
                  style={{
                    color: "#ffcc00",
                    textShadow: "0 0 30px rgba(255,204,0,0.6), 0 0 80px rgba(255,204,0,0.2)",
                  }}
                >
                  POKÉMON
                </span>
              </h1>
            </motion.div>
          )}
        </InView>

        {/* Descripción */}
        <InView triggerOnce={false}>
          {({ inView, ref }) => (
            <motion.p
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={slideInFromLeft(0.5)}
              className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto"
            >
              Compite por las cartas más{" "}
              <span className="text-white font-semibold">legendarias</span> del mundo.
              Desde Charizard First Edition hasta Mewtwo holográfico haz tu oferta
              y conviértete en el{" "}
              <span className="text-yellow-400 font-semibold">Maestro Pokémon</span>.
            </motion.p>
          )}
        </InView>

        {/* Botones */}
        <InView triggerOnce={false}>
          {({ inView, ref }) => (
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInUp(1.0)}
              className="flex flex-col sm:flex-row justify-center gap-4 pt-2"
            >
              <motion.a
                href="/movies"
                className="px-8 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                style={{
                  background: "#ffcc00",
                  color: "#0a0a0f",
                  boxShadow: "0 4px 24px rgba(255,204,0,0.35)",
                }}
                whileHover={{ scale: 1.04, boxShadow: "0 6px 40px rgba(255,204,0,0.6)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Zap className="w-4 h-4" />
                Ver Catálogo
              </motion.a>

              <motion.a
                href="/user/login"
                className="px-8 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white"
                style={{
                  background: "linear-gradient(180deg, rgba(60,8,126,0) 0%, rgba(60,8,126,0.32) 100%), rgba(113,47,255,0.12)",
                  boxShadow: "inset 0 0 12px #bf97ff3d",
                  border: "1px solid rgba(124,58,237,0.4)",
                }}
                whileHover={{ scale: 1.04, borderColor: "rgba(124,58,237,0.8)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Trophy className="w-4 h-4" />
                Iniciar Sesión
              </motion.a>
            </motion.div>
          )}
        </InView>

        {/* Tagline */}
        <InView triggerOnce={false}>
          {({ inView, ref }) => (
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={slideInFromRight(1.1)}
              className="flex items-center justify-center gap-2 text-yellow-400 text-xs uppercase tracking-[0.2em] opacity-60 pt-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              ¡Que comiencen las Subastas!
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </InView>

      </div>

      <style>{`
        @keyframes gridScroll {
          0%   { background-position: 0 0; }
          100% { background-position: 0 48px; }
        }
      `}</style>
    </div>
  );
}
