import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ORÉVA Jewellery House",
    short_name: "ORÉVA",
    description: "Contemporary Accessible Luxury Jewellery House",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF9F1",
    theme_color: "#491323",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
