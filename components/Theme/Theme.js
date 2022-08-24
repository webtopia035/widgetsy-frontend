import React from "react";
import styles from "./Theme.module.css";

const Theme = () => {
  return (
    <>
      <div className={styles.back_arrow}>
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
          defaultValue="#ffffff"
        />
        <input
          className={styles.color_picker}
          type="color"
          defaultValue="#ffffff"
        />
      </div>
      <label className={styles.labels}>Font color</label>
      <div className={styles.theme_color}>
        <input
          placeholder="Hex Code"
          className={styles.input}
          type="text"
          defaultValue="#ffffff"
        />
        <input
          className={styles.color_picker}
          type="color"
          defaultValue="#ffffff"
        />
      </div>
      <br />
    </>
  );
};

export default Theme;
