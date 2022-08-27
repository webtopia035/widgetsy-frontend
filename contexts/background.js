import React, { useState } from "react";

const colorInitial = [
  { color: "#fff", stop: 0, stopPx: 0 },
  { color: "#000", stop: 100, stopPx: 600 },
];

const BackgroundContext = React.createContext({
  colors: colorInitial,
  setColors: () => {},
  angle: 0,
  setAngle: () => {},
  active: 0,
  setActive: () => {},
  gradientColor: "",
  setGradientColor: () => {},
});

export const BackgroundContextProvider = (props) => {
  const [colors, setColors] = useState(colorInitial);
  const [angle, setAngle] = useState(0);
  const [active, setActive] = useState(0);
  const [gradientColor, setGradientColor] = useState("");

  return (
    <BackgroundContext.Provider
      value={{
        colors: colors,
        setColors: setColors,
        angle: angle,
        setAngle: setAngle,
        active: active,
        setActive: setActive,
        gradientColor: gradientColor,
        setGradientColor: setGradientColor,
      }}
    >
      {props.children}
    </BackgroundContext.Provider>
  );
};
export default BackgroundContext;
