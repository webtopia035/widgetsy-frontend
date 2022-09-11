import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import BackgroundContext from "../../contexts/background";
import styles from "./GradientSlider.module.css";

const GradientSlider = () => {
  const sliderContainer = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [gradient, setGradient] = useState("");
  const sliderCtx = useContext(BackgroundContext);

  useLayoutEffect(() => {
    function updateSize() {
      setParentWidth(sliderContainer.current.offsetWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    let tempArr = sliderCtx.colors;
    tempArr[tempArr.length - 1].stopPx = parentWidth;
    sliderCtx.setColors([...tempArr]);
  }, [parentWidth]);

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

  const handleColors = (e) => {
    e.stopPropagation();
    sliderCtx.setElements("background");
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const position = Math.floor((x / parentWidth) * 100);
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
      {gradient && (
        <div className={styles.bar} style={{ background: `${gradient}` }}></div>
      )}
      {sliderCtx.colors.map((color, index) => {
        return (
          <div
            key={index}
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
        );
      })}
    </div>
  );
};

export default GradientSlider;
