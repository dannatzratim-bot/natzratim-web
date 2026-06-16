import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(180deg, #f7f1e5 0%, #dfe8f2 100%)",
          color: "#153a5b",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "2px solid rgba(176,141,87,0.35)",
            borderRadius: 24,
          }}
        />
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: 8 }}>NATZRATIM</div>
        <div style={{ marginTop: 24, fontSize: 30, color: "#6f5637" }}>Comunidad de estudio, tradición y servicio</div>
      </div>
    ),
    size,
  );
}

