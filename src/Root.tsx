import "./index.css";
import { Composition } from "remotion";
import { AkaveExplainer } from "./AkaveExplainer";
import { FPS, TOTAL_FRAMES } from "./config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AkaveExplainer"
        component={AkaveExplainer}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1280}
        height={720}
      />
    </>
  );
};
