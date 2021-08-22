import React from "react";
import Svg, { Path } from "react-native-svg";

interface waveProps {
  width: number;
  height: number;
  containerStyle: object;
}

const Wave: React.FC<waveProps> = ({ height, width, containerStyle }) => {
  return (
    <Svg
      color="blue"
      viewBox="0 0 1440 320"
      width={width}
      height={height}
      style={{ ...containerStyle }}
    >
      <Path
        fill={"#ff2656"}
        fillOpacity="1"
        fillRule="evenodd"
        d="M1,320L45,293.3C80,267,160,213,240,176C320,139,400,117,480,112C560,107,640,117,720,149.3C800,181,880,235,960,240C1040,245,1120,203,1200,197.3C1280,192,1360,224,1400,240L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
      />
    </Svg>
  );
};

export default Wave;
