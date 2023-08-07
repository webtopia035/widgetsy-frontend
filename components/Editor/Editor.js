import React, { useContext } from "react";
import GradientSlider from "./GradientSlider";
import Widget from "../Widgets/Widget";
import BackgroundContext from "../../contexts/background";
import styles from "./Editor.module.css";
import scss from "./BG.module.scss";

const Editor = () => {
  const sliderCtx = useContext(BackgroundContext);
  return (
    <div className={styles.editor_container}>
      {/* <div className={scss.space} /> */}
      <div className={styles.header}>
        <div className={styles.name}>{sliderCtx.details?.title}</div>
        <div className={styles.widget}>{sliderCtx.details?.type}</div>
      </div>
      {sliderCtx.gradientColor && (
        <div className={styles.output_container} id="two">
          <Widget />
        </div>
      )}
      <GradientSlider />
    </div>
  );
};

export default Editor;
