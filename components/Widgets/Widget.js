import React, { useContext, useEffect, useState } from "react";
import {
  Clock,
  Calendar,
  Calculator,
  Timer,
  Whiteboard,
  TemperatureConverter,
  MassConverter,
  LengthConverter,
  AreaConverter,
  SpeedConverter,
} from "widgetsy";
import BackgroundContext from "../../contexts/background";

const Widget = () => {
  const sliderCtx = useContext(BackgroundContext);
  const [widget, setWidget] = useState(null);
  const type = sliderCtx.details.type;
  console.log(type, sliderCtx);
  useEffect(() => {
    if (type === "Clock") {
      setWidget(
        <Clock
          backgroundColor={sliderCtx.colors}
          rotation={sliderCtx.theme.rotation}
          theme={sliderCtx.theme.themeNumber}
          primaryFont={sliderCtx.theme.fontColor}
          primaryColor={sliderCtx.theme.primaryColor}
        />
      );
    } else if (type === "Calculator") {
      setWidget(
        <Calculator
          backgroundColor={sliderCtx.colors}
          rotation={sliderCtx.theme.rotation}
          theme={sliderCtx.theme.themeNumber}
          primaryFont={sliderCtx.theme.fontColor}
          primaryColor={sliderCtx.theme.primaryColor}
        />
      );
    } else if (type === "Calendar") {
      setWidget(
        <Calendar
          backgroundColor={sliderCtx.colors}
          rotation={sliderCtx.theme.rotation}
          theme={sliderCtx.theme.themeNumber}
          primaryFont={sliderCtx.theme.fontColor}
          primaryColor={sliderCtx.theme.primaryColor}
        />
      );
    } else if (type === "Timer") {
      setWidget(
        <Timer
          backgroundColor={sliderCtx.colors}
          rotation={sliderCtx.theme.rotation}
          theme={sliderCtx.theme.themeNumber}
          primaryFont={sliderCtx.theme.fontColor}
          primaryColor={sliderCtx.theme.primaryColor}
        />
      );
    } else if (type === "Whiteboard") {
      setWidget(
        <Whiteboard
          backgroundColor={sliderCtx.colors}
          rotation={sliderCtx.theme.rotation}
          theme={sliderCtx.theme.themeNumber}
          primaryFont={sliderCtx.theme.fontColor}
          primaryColor={sliderCtx.theme.primaryColor}
        />
      );
    } else if (type === "TemperatureConverter") {
      setWidget(
        <TemperatureConverter
          backgroundColor={sliderCtx.colors}
          rotation={sliderCtx.theme.rotation}
          theme={sliderCtx.theme.themeNumber}
          primaryFont={sliderCtx.theme.fontColor}
          primaryColor={sliderCtx.theme.primaryColor}
        />
      );
    } else if (type === "MassConverter") {
      setWidget(
        <MassConverter
          backgroundColor={sliderCtx.colors}
          rotation={sliderCtx.theme.rotation}
          theme={sliderCtx.theme.themeNumber}
          primaryFont={sliderCtx.theme.fontColor}
          primaryColor={sliderCtx.theme.primaryColor}
        />
      );
    } else if (type === "LengthConverter") {
      setWidget(
        <LengthConverter
          backgroundColor={sliderCtx.colors}
          rotation={sliderCtx.theme.rotation}
          theme={sliderCtx.theme.themeNumber}
          primaryFont={sliderCtx.theme.fontColor}
          primaryColor={sliderCtx.theme.primaryColor}
        />
      );
    } else if (type === "AreaConverter") {
      setWidget(
        <AreaConverter
          backgroundColor={sliderCtx.colors}
          rotation={sliderCtx.theme.rotation}
          theme={sliderCtx.theme.themeNumber}
          primaryFont={sliderCtx.theme.fontColor}
          primaryColor={sliderCtx.theme.primaryColor}
        />
      );
    } else if (type === "SpeedConverter") {
      setWidget(
        <SpeedConverter
          backgroundColor={sliderCtx.colors}
          rotation={sliderCtx.theme.rotation}
          theme={sliderCtx.theme.themeNumber}
          primaryFont={sliderCtx.theme.fontColor}
          primaryColor={sliderCtx.theme.primaryColor}
        />
      );
    }
  }, [sliderCtx]);

  return widget;
};

export default Widget;
