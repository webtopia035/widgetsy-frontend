import React, { useState, useEffect, useRef, useContext } from "react";
import { Modal } from "@mui/material";
import Link from "next/link";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import Modals from "../components/Modal/Modals";
import ContextData from "../contexts/contextData";
import styles from "../styles/home.module.css";

let userId = "6333eee649b8e1b484229e12";
const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ref = useRef(null);
  const dataCtx = useContext(ContextData);
  // console.log(dataCtx.template);

  const getWidgetByUserId = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/widget/user/${dataCtx.userId || userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.message);
      }

      const responseData = await response.json();
      dataCtx.setTemplate(responseData.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWidgetByUserId();
  }, []);

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
        {dataCtx.template.map((wid, i) => {
          return (
            <Link key={i} passHref href={`/builder/${wid.id}`}>
              <ProjectCard wid={wid} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
