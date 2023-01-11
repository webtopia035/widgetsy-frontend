import React, { useContext, useEffect, useState } from "react";
import BackgroundContext from "../../contexts/background";
import styles from "./Theme.module.css";
const color = [1, 2, 3, 4, 5];

const Theme = () => {
  const sliderCtx = useContext(BackgroundContext);

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
        {color.map((i) => {
          return (
            <div
              key={i}
              className={styles.theme}
              onClick={(e) => {
                sliderCtx.setTheme((prev) => {
                  return { ...prev, themeNumber: i };
                });
              }}
            ></div>
          );
        })}
      </div>
      <label className={styles.labels}>Primary Color</label>
      <div className={styles.theme_color}>
        <input
          placeholder="Hex Code"
          className={styles.input}
          type="text"
          value={sliderCtx.theme.primaryColor}
          onChange={(e) => {
            sliderCtx.setTheme((prev) => {
              return { ...prev, primaryColor: e.target.value };
            });
          }}
        />
        <input
          className={styles.color_picker}
          type="color"
          value={sliderCtx.theme.primaryColor}
          onChange={(e) => {
            sliderCtx.setTheme((prev) => {
              return { ...prev, primaryColor: e.target.value };
            });
          }}
        />
      </div>
      <label className={styles.labels}>Font color</label>
      <div className={styles.theme_color}>
        <input
          placeholder="Hex Code"
          className={styles.input}
          type="text"
          value={sliderCtx.theme.secondaryColor}
          onChange={(e) => {
            sliderCtx.setTheme((prev) => {
              return { ...prev, secondaryColor: e.target.value };
            });
          }}
        />
        <input
          className={styles.color_picker}
          type="color"
          value={sliderCtx.theme.secondaryColor}
          onChange={(e) => {
            sliderCtx.setTheme((prev) => {
              return { ...prev, secondaryColor: e.target.value };
            });
          }}
        />
      </div>
      <br />
    </>
  );
};

export default Theme;
