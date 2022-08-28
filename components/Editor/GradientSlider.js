import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import BackgroundContext from "../../contexts/background";
import styles from "./GradientSlider.module.css";

const GradientSlider = () => {
  const sliderContainer = useRef(null);
  const nodeRef = useRef(null);
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
    sliderCtx.setElements("background");
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const position = Math.floor((x / parentWidth) * 100);
    console.log(position);
    const newColor = {
      color: sliderCtx.hexColor,
      stop: position,
      stopPx: x,
    };
    const insertPos = searchInsert(sliderCtx.colors, position);
    sliderCtx.setActive(insertPos);
    let tempArr = sliderCtx.colors;
    tempArr.splice(insertPos, 0, newColor);
    sliderCtx.setColors([...tempArr]);
  };

  const handleActive = (index, e) => {
    e.stopPropagation();
    sliderCtx.setActive(index);
  };

  const handleDrag = (e, index) => {
    e.stopPropagation();
    const rect = e.clientX;
    // const rect = getOffset(e.target).left;
    const parentRect = sliderContainer.current.getBoundingClientRect().left;
    const rectLocation = rect - parentRect;
    // console.log(rect.x, parentWidth);
    // console.log(Math.floor((rectLocation / parentWidth) * 100));
    const position = Math.floor((rectLocation / parentWidth) * 100);
    const tempArr = sliderCtx.colors;
    if (position > 100) {
      tempArr[index].stop = 100;
    } else if (position < 0) {
      tempArr[index].stop = 0;
    } else {
      tempArr[index].stop = position;
    }
    console.log(tempArr);
    sliderCtx.setColors([...tempArr]);
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
            nodeRef={nodeRef}
            axis="x"
            bounds={{
              top: 0,
              left: -1 * color.stopPx,
              right: parentWidth - color.stopPx,
              bottom: 0,
            }}
            key={index}
            allowAnyClick={false}
            onDrag={(e) => {
              handleDrag(e, index);
            }}
          >
            <div
              ref={nodeRef}
              onClick={(e) => handleActive(index, e)}
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
