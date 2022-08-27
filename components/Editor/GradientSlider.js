import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import BackgroundContext from "../../contexts/background";
import styles from "./GradientSlider.module.css";

const GradientSlider = () => {
  const sliderContainer = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [gradient, setGradient] = useState("");
  const sliderCtx = useContext(BackgroundContext);

  useEffect(() => {
    let colorString = "";
    sliderCtx.colors.forEach((color) => {
      colorString += `${color.color} ${color.stop}%, `;
    });
    setGradient(
      `linear-gradient(90deg, ${colorString.substring(
        0,
        colorString.length - 2
      )})`
    );
    colorString = `linear-gradient(${
      sliderCtx.angle
    }deg, ${colorString.substring(0, colorString.length - 2)})`;
    sliderCtx.setGradientColor(colorString);
  }, [sliderCtx.colors, sliderCtx.angle]);

  useEffect(() => {
    setParentWidth(sliderContainer.current.clientWidth);
  }, [sliderContainer.current && sliderContainer.current.clientWidth]);

  const handleColors = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const position = Math.floor((x / parentWidth) * 100);
    const newColor = {
      color: "#5dfe66",
      stop: position,
      stopPx: x,
    };
    const insertPos = searchInsert(sliderCtx.colors, position);
    let tempArr = sliderCtx.colors;
    tempArr.splice(insertPos, 0, newColor);
    sliderCtx.setColors([...tempArr]);
  };

  const handleActive = (index, e) => {
    e.stopPropagation();
    sliderCtx.setActive(index);
  };

  const searchInsert = (colors, target) => {
    let s = 0;
    let e = colors.length - 1;

    while (s <= e) {
      let mid = Math.floor(s + (e - s) / 2);
      if (colors[mid].stop === target) {
        return mid;
      } else if (colors[mid].stop > target) {
        e = mid - 1;
      } else {
        s = mid + 1;
      }
    }
    return s;
  };

  return (
    <div
      ref={sliderContainer}
      onClick={(e) => handleColors(e)}
      id="slider_container"
      className={styles.slider_container}
    >
      <div className={styles.bar} style={{ background: `${gradient}` }}></div>
      {sliderCtx.colors.map((color, index) => {
        return (
          <Draggable
            axis="x"
            bounds={{
              top: 0,
              left: -1 * color.stopPx,
              right: parentWidth - color.stopPx,
              bottom: 0,
            }}
            key={index}
            allowAnyClick={false}
          >
            <div
              onClick={(e) => handleActive(index, e)}
              onLoad={() => {
                setParentWidth(sliderContainer.current.clientWidth);
              }}
              className={
                sliderCtx.active === index
                  ? `${styles.slider} ${styles.active}`
                  : `${styles.slider}`
              }
              style={{
                left: `${color.stop}%`,
                backgroundColor: `${color.color}`,
              }}
            ></div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default GradientSlider;
