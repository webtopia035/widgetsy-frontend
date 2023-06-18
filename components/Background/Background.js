import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { SketchPicker } from "react-color";
import BackgroundContext from "../../contexts/background";
import rotationSvg from "../../public/assets/rotation-dial.svg";
import styles from "./Background.module.css";

const Background = () => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const sliderCtx = useContext(BackgroundContext);
  const angleRef = useRef(null);
  const dragInstance = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(Draggable);
    dragInstance.current = Draggable.create(angleRef.current, {
      type: "rotation",
      onDrag() {
        onRotate(this.rotation);
      },
      inertia: false,
    });
  }, [onRotate]);

  const onRotate = useCallback(
    (value) => {
      if (value >= 0) {
        sliderCtx.setAngle(Math.floor(value % 360));
        sliderCtx.setTheme((prev) => {
          return { ...prev, rotation: Math.floor(value % 360) };
        });
      } else {
        sliderCtx.setAngle(360 + Math.floor(value % 360));
      }
    },
    [sliderCtx.setAngle]
  );

  const handleClick = () => {
    setDisplayColorPicker((prev) => !prev);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const compare = (a, b) => {
    if (a.stop < b.stop) {
      return -1;
    }
    if (a.stop > b.stop) {
      return 1;
    }
    return 0;
  };

  const handleBlur = () => {
    const tempArr = sliderCtx.colors;
    tempArr.sort(compare);
    sliderCtx.setColors([...tempArr]);
  };

  const handleChange = (color) => {
    sliderCtx.setHexColor(color.hex);
    let tempArr = sliderCtx.colors;
    tempArr[sliderCtx.active].color = color.hex;
    sliderCtx.setColors([...tempArr]);
  };

  const handleHex = (e) => {
    sliderCtx.setHexColor(e.target.value);
  };

  const handleRemove = (e, index) => {
    e.stopPropagation();
    if (sliderCtx.colors.length > 2) {
      const tempArr = sliderCtx.colors;
      tempArr.splice(index, 1);
      sliderCtx.setColors([...tempArr]);
    }
  };

  const handleStop = (index, value) => {
    const tempArr = sliderCtx.colors;
    if (value > 100) {
      tempArr[index].stop = 100;
    } else if (value < 0 || !value) {
      tempArr[index].stop = 0;
    } else {
      tempArr[index].stop = parseInt(value);
    }
    sliderCtx.setColors([...tempArr]);
  };

  const handleActive = (e, index, color) => {
    e.stopPropagation();
    sliderCtx.setActive(index);
    sliderCtx.setHexColor(color.color);
  };

  return (
    <div className={styles.background_container}>
      <div
        className={styles.back_arrow}
        onClick={() => {
          sliderCtx.setElements("sidebar");
        }}
      >
        <i className="bi bi-arrow-left" />
        Back
      </div>
      <div className={styles.section_name}>Design</div>
      <div
        className={styles.output}
        style={{ background: `${sliderCtx.gradientColor}` }}
      ></div>
      <div className={styles.editing_panel} id="ten">
        <div className={styles.color_panel}>
          <input
            placeholder="Hex Code"
            className={styles.input}
            maxLength={9}
            type="text"
            onChange={handleHex}
            value={sliderCtx.hexColor}
          />
          <div
            style={{
              backgroundColor: `${sliderCtx.hexColor}`,
            }}
            className={styles.color_picker}
            onClick={handleClick}
          ></div>
          {displayColorPicker ? (
            <div className={styles.popover}>
              <div className={styles.cover} onClick={handleClose} />
              <SketchPicker
                disableAlpha={true}
                width={300}
                color={sliderCtx.hexColor}
                onChange={handleChange}
              />
            </div>
          ) : null}
        </div>
        <div className={styles.rotation_panel}>
          <input
            placeholder="Hex Code"
            className={styles.input}
            type="text"
            value={`${sliderCtx.angle}°`}
            onChange={(e) => {
              onRotate(e.target.value);
            }}
          />
          <span ref={angleRef} className={styles.rotation_dial}>
            <Image
              draggable={false}
              width={25}
              height={25}
              src={rotationSvg}
              alt="dial"
            />
          </span>
        </div>
      </div>
      <div className={styles.color_list} id="eight">
        <table cellSpacing={0}>
          <thead className={styles.table_head}>
            <tr>
              <th>Color</th>
              <th>Stop</th>
              <th>
                <i className="bi bi-x-circle"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {sliderCtx.colors.map((color, index) => {
              return (
                <tr
                  className={
                    sliderCtx.active === index
                      ? `${styles.rows} ${styles.active}`
                      : `${styles.rows}`
                  }
                  onClick={(e) => handleActive(e, index, color)}
                  key={index}
                >
                  <td>
                    <div
                      className={styles.color_data}
                      style={{ backgroundColor: `${color.color}` }}
                    ></div>
                  </td>
                  <td>
                    <input
                      className={styles.stop}
                      onChange={(e) => handleStop(index, e.target.value)}
                      onBlur={handleBlur}
                      type="number"
                      value={color.stop}
                    />
                  </td>
                  <td>
                    <i
                      onClick={(e) => handleRemove(e, index)}
                      className={`${styles.cross} bi bi-x`}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Background;
