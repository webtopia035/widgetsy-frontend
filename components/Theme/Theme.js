import React, { useContext, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import BackgroundContext from "../../contexts/background";
import styles from "./Theme.module.css";

// list of different themes
const themeName = [
  "Transparent",
  "Cinnamint",
  "Sky Line",
  "Deep Space",
  "Purpink",
];
const color = ["#ffffff", "#12D8FA", "#0654a5", "#29323c", "#8c037a"];
const themeColor = [
  [],
  [
    { color: "#A6FFCB", stop: 0 },
    { color: "#12D8FA", stop: 50 },
    { color: "#1FA2FF", stop: 100 },
  ],
  [
    { color: "#003973", stop: 0 },
    { color: "#E5E5BE", stop: 100 },
  ],
  [
    { color: "#485563", stop: 0 },
    { color: "#29323c", stop: 100 },
  ],
  [
    { color: "#8815bf", stop: 0 },
    { color: "#AA076B", stop: 50 },
    { color: "#ed0940", stop: 100 },
  ],
];

const Theme = () => {
  const sliderCtx = useContext(BackgroundContext);
  const handleThemeChange = (i) => {
    sliderCtx.setColors(themeColor[i]);
  };

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
        {color.map((col, i) => {
          return (
            <Tooltip
              title={themeName[i]}
              key={i}
              TransitionComponent={Zoom}
              arrow
            >
              <div
                className={styles.theme}
                style={{ backgroundColor: col }}
                onClick={(e) => {
                  sliderCtx.setTheme((prev) => {
                    return { ...prev, themeNumber: i };
                  });
                  handleThemeChange(i);
                }}
              ></div>
            </Tooltip>
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
