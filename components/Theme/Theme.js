import React, { useContext, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import BackgroundContext from "../../contexts/background";
import useTheme from "../../hooks/useTheme";
import styles from "./Theme.module.css";

// list of different themes
const themeName = [
  "GrapeFruit Sunset",
  "Cinnamint",
  "Sky Line",
  "Deep Space",
  "Purpink",
];
const color = ["#e96443", "#12D8FA", "#0654a5", "#29323c", "#8c037a"];

const Theme = () => {
  const sliderCtx = useContext(BackgroundContext);
  const themeColor = useTheme();
  const handleThemeChange = (i) => {
    sliderCtx.setColors(themeColor[i]);
  };

  return (
    <>
      <div
        className={styles.back_arrow}
        onClick={() => {
          sliderCtx.setTheme((prev) => {
            return { ...prev, themeNumber: 0 };
          });
          sliderCtx.setElements("sidebar");
        }}
      >
        <i className="bi bi-arrow-left" />
        Back
      </div>

      <div className={styles.element_title}>Design</div>
      <div className={styles.theme_header}>Theme</div>
      <div id="six">
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
      </div>
      <div id="five">
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
            value={sliderCtx.theme.fontColor}
            onChange={(e) => {
              sliderCtx.setTheme((prev) => {
                return { ...prev, fontColor: e.target.value };
              });
            }}
          />
          <input
            className={styles.color_picker}
            type="color"
            value={sliderCtx.theme.fontColor}
            onChange={(e) => {
              sliderCtx.setTheme((prev) => {
                return { ...prev, fontColor: e.target.value };
              });
            }}
          />
        </div>
      </div>
      <br />
    </>
  );
};

export default Theme;
