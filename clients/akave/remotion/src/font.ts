import { loadFont } from "@remotion/google-fonts/Inter";

// Load Inter — weights used throughout the Akave explainer
export const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
