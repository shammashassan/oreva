import { ImageResponse } from "next/og";

export const alt = "ORÉVA Jewellery House | Elegance, Made Eternal";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#36101B",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Double Gold Framing Border */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1.5px solid rgba(199, 166, 107, 0.45)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "32px",
            border: "1px solid rgba(199, 166, 107, 0.2)",
            display: "flex",
          }}
        />

        {/* Content Stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Mayfair District Header */}
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.45em",
              color: "#C7A66B",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontFamily: "serif",
            }}
          >
            MAYFAIR · LONDON
          </div>

          {/* Primary House Emblem */}
          <div
            style={{
              fontSize: "92px",
              letterSpacing: "0.22em",
              fontWeight: 400,
              color: "#FFF9F1",
              fontFamily: "serif",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            ORÉVA
          </div>

          {/* Descriptor */}
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "0.35em",
              color: "#C7A66B",
              textTransform: "uppercase",
              marginBottom: "28px",
              fontFamily: "serif",
            }}
          >
            JEWELLERY HOUSE
          </div>

          {/* Gold Center Divider */}
          <div
            style={{
              width: "140px",
              height: "1.5px",
              backgroundColor: "#C7A66B",
              marginBottom: "28px",
              opacity: 0.7,
            }}
          />

          {/* House Tagline */}
          <div
            style={{
              fontSize: "28px",
              fontStyle: "italic",
              letterSpacing: "0.08em",
              color: "#EDE1D1",
              fontFamily: "serif",
              marginBottom: "36px",
            }}
          >
            Elegance, Made Eternal.
          </div>

          {/* Subtext */}
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.3em",
              color: "rgba(237, 225, 209, 0.65)",
              textTransform: "uppercase",
            }}
          >
            HAUTE JOAILLERIE · ATELIER EDITIONS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
