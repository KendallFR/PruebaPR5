import toast, { useToaster } from "react-hot-toast"

export function CustomToaster() {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause } = handlers

  return (
    <div
      onMouseEnter={startPause}
      onMouseLeave={endPause}
      style={{
        position: "fixed",
        top: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {toasts
        .filter((t) => t.visible)
        .map((t) => {
          const isSuccess = t.type === "success"
          const isError   = t.type === "error"
          const accent    = isSuccess ? "#facc15" : isError ? "#ef4444" : "#94a3b8"
          const accentRgb = isSuccess ? "250,204,21" : isError ? "239,68,68" : "148,163,184"

          return (
            <div
              key={t.id}
              onClick={() => toast.dismiss(t.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "16px 20px 16px 16px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, #0d1424 0%, #0a0f1e 100%)",
                border: `1px solid rgba(${accentRgb}, 0.25)`,
                boxShadow: `
                  0 20px 60px rgba(0,0,0,0.6),
                  0 0 0 1px rgba(255,255,255,0.03),
                  inset 0 1px 0 rgba(255,255,255,0.06),
                  0 0 40px rgba(${accentRgb}, 0.06)
                `,
                backdropFilter: "blur(24px)",
                minWidth: "300px",
                maxWidth: "400px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                opacity: t.visible ? 1 : 0,
                transform: t.visible
                  ? "translateX(0) scale(1)"
                  : "translateX(40px) scale(0.95)",
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Línea lateral izquierda */}
              <div style={{
                position: "absolute",
                left: 0,
                top: "12%",
                bottom: "12%",
                width: "3px",
                borderRadius: "0 3px 3px 0",
                background: `linear-gradient(180deg, ${accent}, rgba(${accentRgb}, 0.2))`,
              }} />

              {/* Ícono */}
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: `linear-gradient(135deg, rgba(${accentRgb}, 0.15), rgba(${accentRgb}, 0.04))`,
                border: `1px solid rgba(${accentRgb}, 0.2)`,
                fontSize: "18px",
                fontWeight: "bold",
                color: accent,
              }}>
                {isSuccess ? "✓" : isError ? "✕" : "◈"}
              </div>

              {/* Texto */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 700,
                  color: accent,
                  letterSpacing: "0.02em",
                  lineHeight: 1.3,
                }}>
                  {isSuccess ? "¡Éxito!" : isError ? "Error" : "Aviso"}
                </p>
                <p style={{
                  margin: "4px 0 0",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.5,
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {typeof t.message === "string" ? t.message : ""}
                </p>
              </div>

              {/* Botón cerrar */}
              <div style={{
                width: "22px",
                height: "22px",
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.2)",
                fontSize: "10px",
                flexShrink: 0,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                ✕
              </div>

              {/* Barra de progreso inferior */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: `linear-gradient(90deg, rgba(${accentRgb}, 0.5), rgba(${accentRgb}, 0.1))`,
                borderRadius: "0 0 18px 18px",
              }} />
            </div>
          )
        })}
    </div>
  )
}
