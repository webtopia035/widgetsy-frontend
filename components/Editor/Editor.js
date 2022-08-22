import React from "react";
import styles from "./Editor.module.css";

const Editor = () => {
  return (
    <div className={styles.editor_container}>
      <div className={styles.header}>
        <div className={styles.name}>Testing</div>
        <div className={styles.widget}>Clock</div>
      </div>
      <div className={styles.output_container}></div>
      <div className={styles.slider}></div>
    </div>
  );
};

export default Editor;
