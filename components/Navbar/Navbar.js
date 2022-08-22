import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.logo}></div>
      <div className={styles.buttons}>
        <div className={`${styles.close_btn} ${styles.btn}`}>Close</div>
        <div className={`${styles.save_btn} ${styles.btn}`}>Save</div>
        <div className={`${styles.download_btn} ${styles.btn}`}>
          Download Source Code
        </div>
      </div>
    </div>
  );
};

export default Navbar;
