import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import calendar from "../../public/assets/calendar.svg";
import calculator from "../../public/assets/calculator.svg";
import clock from "../../public/assets/clock.svg";
import Timer from "../../public/assets/timer.svg";
import Whiteboard from "../../public/assets/whiteboard.svg";
import Converter from "../../public/assets/converter.svg";
import styles from "./WidgetIcon.module.css";

const WidgetIcon = ({ hover, type }) => {
  const [widget, setWidget] = useState(null);
  useEffect(() => {
    if (type === "Clock") {
      setWidget(
        <div
          style={{
            height: "19%",
            width: "65%",
            backgroundColor: "white",
            transform: hover ? "scale(1.2)" : "scale(1)",
            animation: hover
              ? `${styles.onHover} 250ms ease-in-out`
              : `${styles.offHover} 250ms ease-in-out`,
          }}
        >
          <Image src={clock} alt="widget" />
        </div>
      );
    } else if (type === "Calculator") {
      setWidget(
        <div
          style={{
            height: "78.5%",
            width: "34%",
            backgroundColor: "white",
            transform: hover ? "scale(1.2)" : "scale(1)",
            animation: hover
              ? `${styles.onHover} 250ms ease-in-out`
              : `${styles.offHover} 250ms ease-in-out`,
          }}
        >
          <Image src={calculator} alt="widget" />
        </div>
      );
    } else if (type === "Calendar") {
      setWidget(
        <div
          style={{
            height: "76%",
            width: "50%",
            backgroundColor: "white",
            transform: hover ? "scale(1.2)" : "scale(1)",
            animation: hover
              ? `${styles.onHover} 250ms ease-in-out`
              : `${styles.offHover} 250ms ease-in-out`,
          }}
        >
          <Image src={calendar} alt="widget" />
        </div>
      );
    } else if (type === "Timer") {
      setWidget(
        <div
          style={{
            height: "47%",
            width: "50%",
            backgroundColor: "white",
            transform: hover ? "scale(1.2)" : "scale(1)",
            animation: hover
              ? `${styles.onHover} 250ms ease-in-out`
              : `${styles.offHover} 250ms ease-in-out`,
          }}
        >
          <Image src={Timer} alt="widget" />
        </div>
      );
    } else if (type === "Whiteboard") {
      setWidget(
        <div
          style={{
            height: "47%",
            width: "50%",
            backgroundColor: "white",
            transform: hover ? "scale(1.2)" : "scale(1)",
            animation: hover
              ? `${styles.onHover} 250ms ease-in-out`
              : `${styles.offHover} 250ms ease-in-out`,
          }}
        >
          <Image src={Whiteboard} alt="widget" />
        </div>
      );
    } else {
      setWidget(
        <div
          style={{
            height: "33%",
            width: "50%",
            backgroundColor: "white",
            transform: hover ? "scale(1.2)" : "scale(1)",
            animation: hover
              ? `${styles.onHover} 250ms ease-in-out`
              : `${styles.offHover} 250ms ease-in-out`,
          }}
        >
          <Image src={Converter} alt="widget" />
        </div>
      );
    }
  }, [hover, type]);

  return widget;
};

export default WidgetIcon;
