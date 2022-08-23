import React, { useState } from "react";
import Theme from "../Theme/Theme";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [elements, setElements] = useState("");
  console.log(elements);
  return (
    <div className={styles.sidebar_container}>
      {/* <div className={styles.general}>General</div>
       <div
        className={styles.product_info}
        onClick={() => {
          setElements("info");
        }}
      >
        product Information
      </div>
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
        className={styles.product_backGround}
        onClick={() => {
          setElements("background");
        }}
      >
        Background
      </div> */}
      <Theme />
    </div>
  );
};

export default Sidebar;
