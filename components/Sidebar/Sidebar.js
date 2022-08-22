import React, { useState } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [elements, setElements] = useState("");
  return (
    <div className={styles.sidebar_container}>
      <div className={styles.genral}></div>
      <div className={styles.product_info}></div>
      <div className={styles.design}></div>
      <div className={styles.product_theme}></div>
      <div className={styles.product_backGround}></div>
    </div>
  );
};

export default Sidebar;
