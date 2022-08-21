import React from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import styles from "../styles/home.module.css";

const home = () => {
  return (
    <div className={styles.home_container}>
      <div className={styles.home_background}></div>
      <div className={styles.container}>
        <div className={styles.add_project_card}>
          <div className={styles.plus_icon}>
            <i className="bi bi-plus-lg" />
          </div>
          <div className={styles.new_proj}>New Project</div>
        </div>
        <ProjectCard />
      </div>
    </div>
  );
};

export default home;
