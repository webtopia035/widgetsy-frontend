import React, { useState } from "react";

const BackgroundContext = React.createContext({
  colors: "",
  setColors: () => {},
  angle: 0,
  setAngle: () => {},
  active: 0,
  setActive: () => {},
  gradientColor: "",
  setGradientColor: () => {},
  hexColor: "",
  setHexColor: () => {},
  elements: "",
  setElements: () => {},
  theme: "",
  setTheme: () => {},
  details: "",
  setDetails: () => {},
});

export const BackgroundContextProvider = (props) => {
  const [colors, setColors] = useState();
  const [angle, setAngle] = useState(0);
  const [active, setActive] = useState(0);
  const [gradientColor, setGradientColor] = useState("");
  const [hexColor, setHexColor] = useState("#ffffff");
  const [elements, setElements] = useState("");
  const [theme, setTheme] = useState();
  const [details, setDetails] = useState();

  return (
    <BackgroundContext.Provider
      value={{
        colors,
        setColors,
        angle,
        setAngle,
        active,
        setActive,
        gradientColor,
        setGradientColor,
        hexColor,
        setHexColor,
        elements,
        setElements,
        theme,
        setTheme,
        details,
        setDetails,
      }}
    >
      {props.children}
    </BackgroundContext.Provider>
  );
};
export default BackgroundContext;
