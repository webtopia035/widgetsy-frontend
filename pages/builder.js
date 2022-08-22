import React from "react";
import Editor from "../components/Editor/Editor";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "../styles/Builder.module.css";

const builder = () => {
  return (
    <div className={styles.builder_page}>
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <Editor />
      </div>
    </div>
  );
};

export default builder;
