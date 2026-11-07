import { ImageResponse } from "next/og";

export const alt = "ORÉVA Jewellery House | Elegance, Made Eternal";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OgImage() {
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
          backgroundColor: "#491323",
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
            color: "#FFF9F1",
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
            color: "#C7A66B",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          Jewellery House
        </div>
        <div
          style={{
            width: "120px",
            height: "2px",
            backgroundColor: "#C7A66B",
            marginBottom: "32px",
          }}
        />
        <div
          style={{
            fontSize: "30px",
            fontStyle: "italic",
            color: "#EDE1D1",
            fontFamily: "serif",
          }}
        >
          Elegance, Made Eternal.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
