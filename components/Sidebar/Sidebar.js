import React, { useState } from "react";
import Theme from "../Theme/Theme";
import ProductInfo from "../ProductInfo/ProductInfo";
import styles from "./Sidebar.module.css";
import Background from "../Background/Background";

const Sidebar = () => {
  const [elements, setElements] = useState("");

  return (
    <div className={styles.sidebar_container}>
      {elements === "info" ? (
        <ProductInfo />
      ) : elements === "theme" ? (
        <Theme />
      ) : elements === "background" ? (
        <Background />
      ) : (
        <>
          <div className={styles.general_container}>
            <div className={styles.general}>General</div>
            <div
              className={styles.product_info}
              onClick={() => {
                setElements("info");
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
                setElements("theme");
              }}
            >
              Theme
            </div>
            <div
              className={styles.product_background}
              onClick={() => {
                setElements("background");
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
