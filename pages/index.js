import React, { useState, useEffect, useRef } from "react";
import { Modal } from "@mui/material";
import Link from "next/link";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import Modals from "../components/Modal/Modals";
import styles from "../styles/home.module.css";

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ref = useRef(null);
  // const [res, setRes] = useState("hello");
  // useEffect(() => {
  //   fetch("http://localhost:5000")
  //     .then((res) => res.text())
  //     .then((res) => setRes({ apiResponse: res }));
  // }, []);
  // console.log(res);
  return (
    <div className={styles.home_container}>
      <div className={styles.home_background}></div>
      <div className={styles.container}>
        <div className={styles.add_project_card} onClick={handleOpen}>
          <div className={styles.plus_icon}>
            <i className="bi bi-plus-lg" />
          </div>
          <div className={styles.new_proj}>New Project</div>
        </div>
        <Modal open={open} onClose={handleClose}>
          <Modals ref={ref} />
        </Modal>
        <Link passHref href="/builder">
          <ProjectCard />
        </Link>
      </div>
    </div>
  );
};

export default Home;
