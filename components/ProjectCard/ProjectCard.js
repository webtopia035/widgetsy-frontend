import React from "react";
import styles from "./ProjectCard.module.css";

const ProjectCard = () => {
  return (
    <div className={styles.project_card}>
      <div className={styles.project_icon} />
      <div className={styles.project_name}>#proj 1</div>
      <div className={styles.project_date}>date</div>
    </div>
  );
};

export default ProjectCard;
