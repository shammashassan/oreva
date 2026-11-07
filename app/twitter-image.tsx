import { ImageResponse } from "next/og";

export const alt = "ORÉVA Jewellery House";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
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
          backgroundColor: "#241B1B",
          color: "#FFF9F1",
          padding: "60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            letterSpacing: "0.3em",
            fontSize: "76px",
            fontWeight: "bold",
            color: "#C7A66B",
            fontFamily: "serif",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          ORÉVA
        </div>
        <div
          style={{
            fontSize: "24px",
            letterSpacing: "0.25em",
            color: "#EDE1D1",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          Jewellery House
        </div>
        <div
          style={{
            fontSize: "28px",
            fontStyle: "italic",
            color: "#FFF9F1",
            fontFamily: "serif",
          }}
        >
          Contemporary Accessible Luxury Jewellery
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
