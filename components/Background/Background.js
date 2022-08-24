import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import rgbHex from "rgb-hex";
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { SketchPicker } from "react-color";
import rotationSvg from "../../public/assets/rotation-dial.svg";
import styles from "./Background.module.css";

const Background = () => {
  const [colorList, setColorList] = useState([
    { color: "#fff", stop: 0 },
    { color: "#000", stop: 100 },
    { color: "#fff", stop: 0 },
    { color: "#000", stop: 100 },
    { color: "#fff", stop: 0 },
    { color: "#000", stop: 100 },
    { color: "#fff", stop: 0 },
    { color: "#000", stop: 100 },
    { color: "#fff", stop: 0 },
    { color: "#000", stop: 100 },
  ]);
  const [rgbColor, setRgbColor] = useState({
    r: "255",
    g: "255",
    b: "255",
    a: "1",
  });
  const [hexColor, setHexColor] = useState("#fff");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [angle, setAngle] = useState(0);
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
        setAngle(Math.floor(value % 360));
      } else {
        setAngle(360 + Math.floor(value % 360));
      }
    },
    [setAngle]
  );

  const handleClick = () => {
    setDisplayColorPicker((prev) => !prev);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setHexColor(color.hex);
  };

  const handleHex = (e) => {
    setHexColor(e.target.value);
  };

  const handleRemove = (index) => {
    if (colorList.length > 2) {
      const tempArr = colorList;
      tempArr.splice(index, 1);
      setColorList([...tempArr]);
    }
  };

  return (
    <div className={styles.background_container}>
      <div className={styles.back_arrow}>
        <i className="bi bi-arrow-left" />
        Back
      </div>
      <div className={styles.section_name}>Design</div>
      <div className={styles.product_info}>Background</div>
      <div className={styles.gradient_container}>
        <div className={styles.output}></div>
      </div>
      <div className={styles.editing_panel}>
        <div className={styles.color_panel}>
          <input
            placeholder="Hex Code"
            className={styles.input}
            maxLength={9}
            type="text"
            onChange={handleHex}
            value={hexColor}
          />
          <div
            style={{
              backgroundColor: `${hexColor}`,
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
                color={hexColor}
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
            value={`${angle}°`}
            onChange={(e) => onRotate(e.target.value)}
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
      <div className={styles.color_list}>
        <table>
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
            {colorList.map((color, index) => {
              return (
                <tr className={styles.rows} key={index}>
                  <td>
                    <div
                      className={styles.color_data}
                      style={{ backgroundColor: `${color.color}` }}
                    ></div>
                  </td>
                  <td>
                    <input
                      className={styles.stop}
                      type="number"
                      value={color.stop}
                    />
                  </td>
                  <td>
                    <i
                      onClick={() => handleRemove(index)}
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