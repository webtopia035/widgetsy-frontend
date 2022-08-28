import React, { useState, useContext } from "react";
import Theme from "../Theme/Theme";
import ProductInfo from "../ProductInfo/ProductInfo";
import styles from "./Sidebar.module.css";
import Background from "../Background/Background";
import BackgroundContext from "../../contexts/background";

const Sidebar = () => {
  const sliderCtx = useContext(BackgroundContext);

  return (
    <div className={styles.sidebar_container}>
      {sliderCtx.elements === "info" ? (
        <ProductInfo />
      ) : sliderCtx.elements === "theme" ? (
        <Theme />
      ) : sliderCtx.elements === "background" ? (
        <Background />
      ) : (
        <>
          <div className={styles.general_container}>
            <div className={styles.general}>General</div>
            <div
              className={styles.product_info}
              onClick={() => {
                sliderCtx.setElements("info");
              }}
            >
              Product Information
            </div>
          </div>
          <div className={styles.design_container}>
            <div className={styles.design}>Design</div>
            <div
              className={styles.product_theme}
              onClick={() => {
                sliderCtx.setElements("theme");
              }}
            >
              Theme
            </div>
            <div
              className={styles.product_background}
              onClick={() => {
                sliderCtx.setElements("background");
              }}
            >
              Background
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
