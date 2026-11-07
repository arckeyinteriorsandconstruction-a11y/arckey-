import { ImageResponse } from "next/og";

export const alt = "Arckey Interiors and Construction, Delhi NCR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#18264a",
          color: "#fafaf7",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 1, color: "#e3a72f" }}>
          Interiors and Construction
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 108, fontWeight: 700 }}>Arckey</div>
          <div style={{ display: "flex", fontSize: 40, color: "#d6d3d1", marginTop: 12 }}>
            Interior design and construction in Delhi NCR
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a8a29e" }}>+91 98103 77686</div>
      </div>
    ),
    size,
  );
}
