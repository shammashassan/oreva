import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#491323",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFF9F1",
          borderRadius: 6,
          fontWeight: 600,
          fontFamily: "serif",
        }}
      >
        O
      </div>
    ),
    {
      ...size,
    }
  );
}
