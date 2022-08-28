import React, { useContext, useState } from "react";
import BackgroundContext from "../../contexts/background";
import styles from "./Theme.module.css";

const Theme = () => {
  const sliderCtx = useContext(BackgroundContext);
  const [primary, setPrimary] = useState("#ffffff");
  const [fontColor, setFontColor] = useState("#ffffff");
  return (
    <>
      <div
        className={styles.back_arrow}
        onClick={() => {
          sliderCtx.setElements("sidebar");
        }}
      >
        <i className="bi bi-arrow-left" />
        Back
      </div>
      <div className={styles.element_title}>Design</div>
      <div className={styles.theme_header}>Theme</div>
      <div className={`${styles.theme_title} ${styles.labels}`}>
        Choose Theme
      </div>
      <div className={styles.theme_container}>
        <div className={styles.theme}></div>
        <div className={styles.theme}></div>
        <div className={styles.theme}></div>
        <div className={styles.theme}></div>
        <div className={styles.theme}></div>
      </div>
      <label className={styles.labels}>Primary Color</label>
      <div className={styles.theme_color}>
        <input
          placeholder="Hex Code"
          className={styles.input}
          type="text"
          defaultValue={primary}
          value={primary}
          onChange={(e) => {
            setPrimary(e.target.value);
          }}
        />
        <input
          className={styles.color_picker}
          type="color"
          value={primary}
          defaultValue={primary}
          onChange={(e) => {
            setPrimary(e.target.value);
          }}
        />
      </div>
      <label className={styles.labels}>Font color</label>
      <div className={styles.theme_color}>
        <input
          placeholder="Hex Code"
          className={styles.input}
          type="text"
          defaultValue={fontColor}
          value={fontColor}
          onChange={(e) => {
            setFontColor(e.target.value);
          }}
        />
        <input
          className={styles.color_picker}
          type="color"
          defaultValue={fontColor}
          value={fontColor}
          onChange={(e) => {
            setFontColor(e.target.value);
          }}
        />
      </div>
      <br />
    </>
  );
};

export default Theme;
