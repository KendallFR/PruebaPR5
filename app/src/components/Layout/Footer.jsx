/**
 * Footer.jsx — RedCard Market Trading v3
 *
 * Coherente con Header.jsx y Home.jsx:
 *  • Rajdhani + DM Sans · gold #ffcc00 · purple #7c3aed · dark #03020c
 *  • Canvas de estrellas doradas (idéntico al header)
 *  • Watermark tipográfico "REDCARD" de fondo
 *  • Pokeball grande con spin al click
 *  • Línea divisor que se dibuja sola con anime.js
 *  • Links con flechas animadas · chips con spring · orbs que respiran
 *  • Sección "En vivo" con auctions destacadas
 *  • Sin "Estado del mercado"
 */

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Github, Mail, MessageCircle } from "lucide-react";

const an = (...args) => window.anime?.(...args);

// ─── Stars canvas ─────────────────────────────────────────────────────────────
function StarCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    const ctx = c.getContext("2d");
    const stars = Array.from({ length: 65 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 0.9 + 0.12, a: Math.random() * 0.45,
      sp: Math.random() * 0.2 + 0.05, da: (Math.random() - 0.5) * 0.013,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach(s => {
        s.a = Math.max(0.02, Math.min(0.55, s.a + s.da));
        if (Math.random() < 0.007) s.da *= -1;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,204,0,${s.a})`; ctx.fill();
        s.x -= s.sp * 0.08;
        if (s.x < 0) { s.x = c.width; s.y = Math.random() * c.height; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas ref={ref} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", opacity: 0.5, zIndex: 0,
    }} />
  );
}

// ─── Pokeball grande ──────────────────────────────────────────────────────────
function FooterBall({ ballRef }) {
  return (
    <div ref={ballRef} style={{
      width: 48, height: 48, borderRadius: "50%", overflow: "hidden",
      position: "relative", flexShrink: 0, cursor: "pointer",
      animation: "ftBallGlow 3.5s ease-in-out infinite",
    }}>
      {/* Top purple */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "50%",
        background: "linear-gradient(140deg,#1a0050 0%,#5b21b6 40%,#7c3aed 70%,#9333ea 100%)",
      }}>
        <div style={{ position: "absolute", top: 4, left: 6, width: 14, height: 9,
          borderRadius: "50%", background: "rgba(255,255,255,.25)", filter: "blur(3px)" }} />
        <div style={{ position: "absolute", top: 7, left: 7, width: 7, height: 7,
          borderRadius: "50%", background: "rgba(255,140,255,.98)", boxShadow: "0 0 8px rgba(255,60,255,.9)" }} />
        <div style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7,
          borderRadius: "50%", background: "rgba(255,140,255,.98)", boxShadow: "0 0 8px rgba(255,60,255,.9)" }} />
      </div>
      {/* Bottom grey */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
        background: "linear-gradient(135deg,#e4e4e7 0%,#a1a1aa 55%,#71717a 100%)",
      }}>
        <div style={{ position: "absolute", bottom: 5, right: 7, width: 9, height: 5,
          borderRadius: "50%", background: "rgba(255,255,255,.5)", filter: "blur(2px)" }} />
      </div>
      {/* Belt */}
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 3.5,
        background: "#06060f", transform: "translateY(-50%)", zIndex: 3 }} />
      {/* Center button */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 4 }}>
        <div style={{
          width: 14, height: 14, borderRadius: "50%", border: "3px solid #06060f",
          background: "radial-gradient(circle at 35% 35%,#fff 0%,#e4e4e7 50%,#a1a1aa 100%)",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,.35)",
        }} />
      </div>
      {/* Gloss */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "linear-gradient(140deg,rgba(255,255,255,.2) 0%,transparent 52%)",
        pointerEvents: "none", zIndex: 5,
      }} />
    </div>
  );
}

// ─── Footer link con flecha animada ───────────────────────────────────────────
function FLink({ href, children, gold = false }) {
  const arrRef = useRef(null);
  const elRef  = useRef(null);
  const base   = gold ? "rgba(255,204,0,.55)" : "rgba(255,255,255,.5)";
  const hover  = "#ffcc00";
  return (
    <Link to={href} ref={elRef}
      style={{
        display: "flex", alignItems: "center", gap: 0, marginBottom: 10,
        fontSize: 13.5, color: base, textDecoration: "none",
        fontFamily: "'DM Sans',sans-serif", transition: "color .16s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = hover;
        an({ targets: arrRef.current, width: ["0px","14px"], opacity: [0,1], duration: 180, easing: "easeOutQuad" });
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = base;
        an({ targets: arrRef.current, width: "0px", opacity: 0, duration: 140, easing: "easeInQuad" });
      }}
      onClick={() => an({ targets: elRef.current, translateX: [0,5,0], duration: 280, easing: "spring(1,80,10,0)" })}
    >
      <span ref={arrRef} style={{ fontSize: 12, color: "#ffcc00", overflow: "hidden",
        width: 0, opacity: 0, display: "inline-block" }}>›</span>
      {children}
    </Link>
  );
}

// ─── Social button ────────────────────────────────────────────────────────────
function SocialBtn({ href = "#", icon, label }) {
  const ref = useRef(null);
  return (
    <a href={href} ref={ref} title={label} style={{
      width: 36, height: 36, borderRadius: 10, textDecoration: "none",
      border: "1px solid rgba(255,204,0,.16)", background: "rgba(255,204,0,.04)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "rgba(255,204,0,.5)", transition: "all .18s", cursor: "pointer",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(255,204,0,.5)";
        e.currentTarget.style.background  = "rgba(255,204,0,.1)";
        e.currentTarget.style.color       = "#ffcc00";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,204,0,.16)";
        e.currentTarget.style.background  = "rgba(255,204,0,.04)";
        e.currentTarget.style.color       = "rgba(255,204,0,.5)";
      }}
      onClick={() => an({ targets: ref.current, scale: [1,.78,1.12,1], duration: 380, easing: "spring(1,80,10,0)" })}
    >
      {icon}
    </a>
  );
}

// ─── Column header ────────────────────────────────────────────────────────────
function ColH({ children }) {
  const ref = useRef(null);
  return (
    <div ref={ref} style={{
      fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 9.5,
      letterSpacing: ".22em", textTransform: "uppercase",
      color: "rgba(255,204,0,.45)", marginBottom: 18,
      display: "flex", alignItems: "center", gap: 8,
      transition: "color .2s", cursor: "default",
    }}
      onMouseEnter={() => an({ targets: ref.current, color: "rgba(255,204,0,.9)", duration: 200, easing: "easeOutQuad" })}
      onMouseLeave={() => an({ targets: ref.current, color: "rgba(255,204,0,.45)", duration: 300, easing: "easeOutQuad" })}
    >
      {children}
      <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(255,204,0,.2),transparent)" }} />
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export function Footer() {
  const footerRef  = useRef(null);
  const divRef     = useRef(null);
  const ballRef    = useRef(null);
  const nameRef    = useRef(null);
  const taglineRef = useRef(null);
  const botRef     = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();

      // Footer entrance
      an({ targets: footerRef.current,   opacity:[0,1], translateY:[40,0], duration:800, easing:"cubicBezier(0.16,1,0.3,1)" });

      // Divider draws from left
      an({ targets: divRef.current,      scaleX:[0,1], duration:900, delay:150, easing:"cubicBezier(0.16,1,0.3,1)", transformOrigin:"left" });

      // Ball spins in
      an({ targets: ballRef.current,     opacity:[0,1], scale:[0.4,1.1,1], rotate:[-180,15,0], duration:800, delay:260, easing:"cubicBezier(0.16,1,0.3,1)" });

      // Logo name
      an({ targets: nameRef.current,     opacity:[0,1], translateX:[-20,0], letterSpacing:[".2em",".1em"], duration:700, delay:390, easing:"cubicBezier(0.16,1,0.3,1)" });

      // Tagline from right
      an({ targets: taglineRef.current,  opacity:[0,1], translateX:[20,0], duration:650, delay:450, easing:"cubicBezier(0.16,1,0.3,1)" });

      // Column headers
      an({ targets: ".ft-col-h-el",      opacity:[0,1], translateY:[-10,0], delay:window.anime?.stagger(80,{start:510}), duration:500, easing:"cubicBezier(0.16,1,0.3,1)" });

      // Links cascade
      an({ targets: ".ft-link-el",       opacity:[0,1], translateX:[-12,0], delay:window.anime?.stagger(36,{start:590}), duration:380, easing:"cubicBezier(0.16,1,0.3,1)" });

      // Bottom row
      an({ targets: botRef.current,      opacity:[0,1], translateY:[12,0], duration:550, delay:900, easing:"cubicBezier(0.16,1,0.3,1)" });

      // Chips pop
      an({ targets: ".ft-chip-el",       opacity:[0,1], scale:[.7,1.05,1], delay:window.anime?.stagger(55,{start:980}), duration:400, easing:"spring(1,80,10,0)" });

      // Social buttons pop
      an({ targets: ".ft-soc-el",        opacity:[0,1], scale:[.5,1.1,1], delay:window.anime?.stagger(70,{start:1020}), duration:500, easing:"spring(1,80,10,0)" });

      // Watermark fade in
      an({ targets: ".ft-watermark",     opacity:[0,0.028], translateY:[20,0], duration:1200, delay:600, easing:"cubicBezier(0.16,1,0.3,1)" });

    }, { threshold: 0.1 });

    if (footerRef.current) io.observe(footerRef.current);

    // Orbs breathing loop (start immediately)
    an({ targets: ".ft-orb", scale:[1,1.15,1], opacity:[.7,1,.7], delay:window.anime?.stagger(400), duration:4000, easing:"easeInOutSine", loop:true });

    // Periodic watermark shimmer
    const id = setInterval(() =>
      an({ targets: ".ft-watermark", opacity:[0.028,0.055,0.028], duration:2000, easing:"easeInOutSine" })
    , 6000);

    return () => clearInterval(id);
  }, []);

  const ballClick = () => {
    an({ targets: ballRef.current, rotate:[0,720], scale:[1,1.28,1], duration:900, easing:"cubicBezier(0.16,1,0.3,1)" });
    an({ targets: ballRef.current,
      boxShadow: [
        "0 0 0 2px rgba(255,204,0,.3), 0 0 24px rgba(255,204,0,.25), 0 6px 18px rgba(0,0,0,.9)",
        "0 0 0 4px rgba(255,204,0,.95), 0 0 64px rgba(255,204,0,.85), 0 6px 18px rgba(0,0,0,.9)",
        "0 0 0 2px rgba(255,204,0,.3), 0 0 24px rgba(255,204,0,.25), 0 6px 18px rgba(0,0,0,.9)",
      ],
      duration: 900, easing: "easeInOutQuad",
    });
  };

  const iconS = { width: 15, height: 15 };

  return (
    <>
      <style>{`
        @keyframes ftBallGlow {
          0%,100% { box-shadow: 0 0 0 2px rgba(255,204,0,.3), 0 0 24px rgba(255,204,0,.25), 0 6px 18px rgba(0,0,0,.9); }
          50%     { box-shadow: 0 0 0 3px rgba(255,204,0,.75), 0 0 44px rgba(255,204,0,.6), 0 6px 18px rgba(0,0,0,.9); }
        }
        @keyframes liveDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:.5; transform:scale(.7); }
        }
        @keyframes ftScan {
          0%  { transform:translateX(-100%); opacity:0; }
          8%  { opacity:1; } 92% { opacity:1; }
          100%{ transform:translateX(450%); opacity:0; }
        }
        .ft-scan-el { animation: ftScan 6s ease-in-out infinite; animation-delay:2s; }
      `}</style>

      <footer ref={footerRef} style={{
        position: "relative", width: "100%", overflow: "hidden",
        background: "rgba(3,2,12,.98)",
        borderTop: "none",
        opacity: 0,
      }}>

        <StarCanvas />

        {/* Scan line */}
        <div className="ft-scan-el" style={{
          position: "absolute", top: 0, left: 0, width: "26%", height: "100%",
          background: "linear-gradient(90deg,transparent,rgba(255,204,0,.05),transparent)",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* Watermark */}
        <div className="ft-watermark" style={{
          position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
          fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 88,
          letterSpacing: ".08em", textTransform: "uppercase", whiteSpace: "nowrap",
          color: "rgba(255,204,0,.028)", pointerEvents: "none", zIndex: 0,
          userSelect: "none", opacity: 0,
        }}>REDCARD</div>

        {/* Energy orbs */}
        <div className="ft-orb" style={{ position:"absolute", bottom:-80, right:-50, width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,.14) 0%,transparent 70%)", filter:"blur(50px)", pointerEvents:"none", zIndex:0 }} />
        <div className="ft-orb" style={{ position:"absolute", bottom:-60, left:"10%", width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,204,0,.08) 0%,transparent 70%)", filter:"blur(55px)", pointerEvents:"none", zIndex:0 }} />
        <div className="ft-orb" style={{ position:"absolute", top:"30%", left:"45%", width:150, height:150, borderRadius:"50%", background:"radial-gradient(circle,rgba(220,20,60,.06) 0%,transparent 70%)", filter:"blur(45px)", pointerEvents:"none", zIndex:0 }} />

        {/* Gold→purple top divider */}
        <div ref={divRef} style={{
          height: 1.5, transformOrigin: "left",
          background: "linear-gradient(90deg,transparent 0%,rgba(255,204,0,.7) 30%,rgba(200,120,255,.6) 65%,transparent 100%)",
          position: "relative", zIndex: 5,
        }}>
          {/* Glow under divider */}
          <div style={{
            position: "absolute", top: 0, left: "5%", right: "5%", height: 20,
            background: "linear-gradient(180deg,rgba(255,204,0,.18),transparent)",
            filter: "blur(8px)", pointerEvents: "none",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 4, maxWidth: 1360, margin: "0 auto", padding: "52px 36px 32px" }}>

          {/* ── Brand row ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,.05)",
            marginBottom: 40, gap: 24, flexWrap: "wrap",
          }}>
            <Link to="/" style={{ display:"flex", alignItems:"center", gap:14, textDecoration:"none" }}
              onClick={ballClick}>
              <FooterBall ballRef={ballRef} />
              <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                <span ref={nameRef} style={{
                  fontFamily: "'Rajdhani','Segoe UI',sans-serif",
                  fontWeight: 700, fontSize: 22, letterSpacing: ".1em", textTransform: "uppercase",
                  background: "linear-gradient(90deg,#ffcc00 0%,#ffe566 28%,#fff 56%,#c084fc 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  whiteSpace: "nowrap", lineHeight: 1, opacity: 0,
                }}>REDCARD MARKET</span>
                <span style={{ fontSize: 8.5, letterSpacing: ".28em", textTransform: "uppercase",
                  color: "rgba(255,204,0,.4)", fontWeight: 600 }}>
                  TRADING CARDS · ISW-613
                </span>
              </div>
            </Link>

            <p ref={taglineRef} style={{
              fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: 13,
              letterSpacing: ".12em", textTransform: "uppercase",
              color: "rgba(255,255,255,.35)", maxWidth: 260, lineHeight: 1.65,
              textAlign: "right", opacity: 0,
            }}>
              La arena definitiva<br />
              para cartas{" "}
              <span style={{ color: "rgba(255,204,0,.65)" }}>legendarias</span>.<br />
              Subastas en tiempo real.
            </p>
          </div>

          {/* ── Links 3-col ── */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0, marginBottom: 44,
          }}>

            {/* Plataforma */}
            <div style={{ paddingRight: 32 }}>
              <div className="ft-col-h-el" style={{ opacity: 0 }}><ColH>Plataforma</ColH></div>
              {[
                ["Catálogo de Cartas",    "/carta"],
                ["Subastas Activas",      "/subasta/SubastasActivas"],
                ["Subastas Finalizadas",  "/subasta/SubastasFinalizadas"],
                ["Cartas Holográficas",   "/carta"],
              ].map(([t,h]) => (
                <span key={t} className="ft-link-el" style={{ opacity:0, display:"block" }}>
                  <FLink href={h}>{t}</FLink>
                </span>
              ))}
            </div>

            {/* Cuenta */}
            <div style={{ paddingRight: 32 }}>
              <div className="ft-col-h-el" style={{ opacity: 0 }}><ColH>Cuenta</ColH></div>
              {[
                ["Iniciar Sesión",  "/usuario/login"],
                ["Registrarse",     "/usuario/create"],
                ["Mis Pagos",       "/facturacion"],
                ["Soporte",         "#"],
              ].map(([t,h]) => (
                <span key={t} className="ft-link-el" style={{ opacity:0, display:"block" }}>
                  <FLink href={h}>{t}</FLink>
                </span>
              ))}
            </div>

            {/* En vivo */}
            <div>
              <div className="ft-col-h-el" style={{ opacity: 0 }}>
                <ColH>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
                    display: "inline-block", boxShadow: "0 0 7px rgba(34,197,94,.8)",
                    animation: "liveDot 1.4s ease-in-out infinite",
                  }} />
                  En vivo ahora
                </ColH>
              </div>
              {[
                "Charizard Base Set",
                "Mewtwo Shadowless",
                "Pikachu 1st Edition",
                "Blastoise Holo",
              ].map((t) => (
                <span key={t} className="ft-link-el" style={{ opacity:0, display:"block" }}>
                  <FLink href="/subasta/SubastasActivas" gold>{t}</FLink>
                </span>
              ))}
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div ref={botRef} style={{
            borderTop: "1px solid rgba(255,255,255,.05)",
            paddingTop: 24, opacity: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 14,
          }}>
            <p style={{ fontSize: 11.5, color: "rgba(255,255,255,.25)", fontFamily: "'DM Sans',sans-serif" }}>
              © {new Date().getFullYear()}{" "}
              <span style={{ color: "rgba(255,204,0,.45)" }}>RedCard Market Trading</span>
              {" "}— Todos los derechos reservados.
            </p>

            <div style={{ display: "flex", gap: 8 }} className="ft-soc-el-wrap">
              {[
                { icon: <Github style={iconS}/>,         label:"GitHub" },
                { icon: <Mail style={iconS}/>,           label:"Email" },
                { icon: <MessageCircle style={iconS}/>,  label:"Discord" },
              ].map(({ icon, label }) => (
                <span key={label} className="ft-soc-el" style={{ opacity:0 }}>
                  <SocialBtn icon={icon} label={label} />
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {["React","Vite","Tailwind","anime.js"].map(t => (
                <span key={t} className="ft-chip-el" style={{
                  opacity: 0, fontSize: 9.5, padding: "3px 9px", borderRadius: 20,
                  border: "1px solid rgba(255,255,255,.07)",
                  color: "rgba(255,255,255,.28)", fontFamily: "'DM Sans',sans-serif",
                  letterSpacing: ".04em",
                }}>{t}</span>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
