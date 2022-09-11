import React, { useContext } from "react";
import GradientSlider from "./GradientSlider";
import BackgroundContext from "../../contexts/background";
import styles from "./Editor.module.css";

const Editor = () => {
  const sliderCtx = useContext(BackgroundContext);

  return (
    <div className={styles.editor_container}>
      <div className={styles.header}>
        <div className={styles.name}>Testing</div>
        <div className={styles.widget}>Clock</div>
      </div>
      {sliderCtx.gradientColor && (
        <div
          className={styles.output_container}
          style={{ background: `${sliderCtx.gradientColor}` }}
        ></div>
      )}
      <GradientSlider />
    </div>
  );
};

export default Editor;
