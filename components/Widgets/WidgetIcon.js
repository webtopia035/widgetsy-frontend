import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import calendar from "../../public/assets/calendar.svg";
import calculator from "../../public/assets/calculator.svg";
import clock from "../../public/assets/clock.svg";
import styles from "./WidgetIcon.module.css";

const WidgetIcon = ({ hover, type }) => {
  console.log(styles);
  const [widget, setWidget] = useState(null);
  console.log(hover);
  useEffect(() => {
    switch (type) {
      case "Clock":
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
        break;
      case "Calculator":
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
        break;
      case "Calendar":
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
        break;

      default:
        break;
    }
  }, [hover, type]);

  return widget;
};

export default WidgetIcon;
