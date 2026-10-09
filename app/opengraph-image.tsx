import { ImageResponse } from "next/og";
import { storeConfig } from "@/config/store";

export const alt = "VANTA — Form Over Noise.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "56px 64px",
          backgroundColor: "#F4F2ED",
          color: "#111111",
        }}
      >
        <div style={{ display: "flex", fontSize: 18, letterSpacing: "0.12em" }}>
          {storeConfig.announcement.campaign}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 190, fontWeight: 700, letterSpacing: "-0.065em", lineHeight: 1 }}>
            {storeConfig.name}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 32, letterSpacing: "0.03em" }}>
            {storeConfig.tagline}
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", borderTop: "1px solid #111111" }} />
      </div>
    ),
    size,
  );
}
