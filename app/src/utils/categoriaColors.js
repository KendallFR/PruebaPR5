// ── Colores para TODAS las categorías ──
export const categoriaStyles = {
  Pokemon:    "bg-purple-400/20 border-purple-400 text-purple-300 shadow-purple-400/20",
  Objeto:     "bg-slate-400/20 border-slate-400 text-white shadow-slate-300/20",
  Entrenador: "bg-orange-400/20 border-orange-400 text-orange-300 shadow-orange-400/20",
  Electrico:  "bg-yellow-400/20 border-yellow-400 text-yellow-300 shadow-yellow-400/20",
  Fuego:      "bg-red-500/20 border-red-500 text-red-300 shadow-red-500/20",
  Agua:       "bg-blue-500/20 border-blue-500 text-blue-300 shadow-blue-500/20",
  Planta:     "bg-green-500/20 border-green-500 text-green-300 shadow-green-500/20",
  Normal:     "bg-gray-400/20 border-gray-400 text-gray-300 shadow-gray-400/20",
  Lucha:      "bg-amber-700/20 border-amber-700 text-amber-500 shadow-amber-700/20",
  Siniestro:  "bg-zinc-700/20 border-zinc-500 text-zinc-300 shadow-zinc-500/20",
  Acero:      "bg-cyan-300/20 border-cyan-300 text-cyan-200 shadow-cyan-300/20",
  Psiquico:   "bg-pink-500/20 border-pink-500 text-pink-300 shadow-pink-500/20",
  Fantasma:   "bg-violet-700/20 border-violet-600 text-violet-300 shadow-violet-600/20",
  Bicho:      "bg-lime-500/20 border-lime-500 text-lime-300 shadow-lime-500/20",
  Veneno:     "bg-fuchsia-600/20 border-fuchsia-600 text-fuchsia-300 shadow-fuchsia-600/20",
  Volador:    "bg-sky-400/20 border-sky-400 text-sky-300 shadow-sky-400/20",
  Hada:       "bg-rose-300/20 border-rose-300 text-rose-200 shadow-rose-300/20",
  Hielo:      "bg-teal-300/20 border-teal-300 text-teal-200 shadow-teal-300/20",
  Dragon:     "bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-indigo-500/20",
  Tierra:     "bg-yellow-700/20 border-yellow-700 text-yellow-500 shadow-yellow-700/20",
  Roca:       "bg-stone-500/20 border-stone-500 text-stone-300 shadow-stone-500/20",
};

export const categoriaGlow = {
  Pokemon:    { border: "border-purple-400/30",   hex: "#a855f7", rgb: "168,85,247"  },
  Objeto:     { border: "border-slate-400/30",    hex: "#94a3b8", rgb: "148,163,184" },
  Entrenador: { border: "border-orange-400/30",   hex: "#f97316", rgb: "249,115,22"  },
  Electrico:  { border: "border-yellow-400/30",   hex: "#facc15", rgb: "250,204,21"  },
  Fuego:      { border: "border-red-500/30",      hex: "#ef4444", rgb: "239,68,68"   },
  Agua:       { border: "border-blue-500/30",     hex: "#3b82f6", rgb: "59,130,246"  },
  Planta:     { border: "border-green-500/30",    hex: "#22c55e", rgb: "34,197,94"   },
  Normal:     { border: "border-gray-400/30",     hex: "#9ca3af", rgb: "156,163,175" },
  Lucha:      { border: "border-amber-700/30",    hex: "#b45309", rgb: "180,83,9"    },
  Siniestro:  { border: "border-zinc-500/30",     hex: "#71717a", rgb: "113,113,122" },
  Acero:      { border: "border-cyan-300/30",     hex: "#67e8f9", rgb: "103,232,249" },
  Psiquico:   { border: "border-pink-500/30",     hex: "#ec4899", rgb: "236,72,153"  },
  Fantasma:   { border: "border-violet-600/30",   hex: "#7c3aed", rgb: "124,58,237"  },
  Bicho:      { border: "border-lime-500/30",     hex: "#84cc16", rgb: "132,204,22"  },
  Veneno:     { border: "border-fuchsia-600/30",  hex: "#c026d3", rgb: "192,38,211"  },
  Volador:    { border: "border-sky-400/30",      hex: "#38bdf8", rgb: "56,189,248"  },
  Hada:       { border: "border-rose-300/30",     hex: "#fda4af", rgb: "253,164,175" },
  Hielo:      { border: "border-teal-300/30",     hex: "#5eead4", rgb: "94,234,212"  },
  Dragon:     { border: "border-indigo-500/30",   hex: "#6366f1", rgb: "99,102,241"  },
  Tierra:     { border: "border-yellow-700/30",   hex: "#a16207", rgb: "161,98,7"    },
  Roca:       { border: "border-stone-500/30",    hex: "#78716c", rgb: "120,113,108" },
};

// Helper: obtiene glow por descripción de categoría
export function getGlowByCategoria(descripcion) {
  return categoriaGlow[descripcion] ?? { border: "border-white/10", hex: "#94a3b8", rgb: "148,163,184" };
}
