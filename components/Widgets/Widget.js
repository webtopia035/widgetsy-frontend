import React, { useContext, useEffect, useState } from "react";
import { Clock, Calendar, Calculator } from "widgetsy";
import BackgroundContext from "../../contexts/background";

const Widget = () => {
  const sliderCtx = useContext(BackgroundContext);
  const [widget, setWidget] = useState(null);
  useEffect(() => {
    switch (sliderCtx.details.type) {
      case "Clock":
        setWidget(
          <Clock
            backgroundColor={sliderCtx.colors}
            rotation={sliderCtx.theme.rotation}
            theme={sliderCtx.theme.themeNumber}
            primaryFont={sliderCtx.theme.fontColor}
            primaryColor={sliderCtx.theme.primaryColor}
          />
        );
        break;
      case "Calculator":
        setWidget(
          <Calculator
            backgroundColor={sliderCtx.colors}
            rotation={sliderCtx.theme.rotation}
            theme={sliderCtx.theme.themeNumber}
            primaryFont={sliderCtx.theme.fontColor}
            primaryColor={sliderCtx.theme.primaryColor}
          />
        );
        break;
      case "Calendar":
        setWidget(
          <Calendar
            backgroundColor={sliderCtx.colors}
            rotation={sliderCtx.theme.rotation}
            theme={sliderCtx.theme.themeNumber}
            primaryFont={sliderCtx.theme.fontColor}
            primaryColor={sliderCtx.theme.primaryColor}
          />
        );
        break;

      default:
        break;
    }
  }, [sliderCtx]);

  return widget;
};

export default Widget;
