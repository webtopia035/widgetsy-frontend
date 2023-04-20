import React, { useState, useEffect, useRef, useContext } from "react";
import { config } from "../utils/config";
import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import { ThreeCircles } from "react-loader-spinner";
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
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const ref = useRef(null);
  const router = useRouter();
  const dataCtx = useContext(ContextData);

  const getWidgetByUserId = async () => {
    // setSpinnerVisible(true);
    try {
      const response = await fetch(
        `${config.url}/api/widget/user/${dataCtx.userId || userId}`,
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
      setSpinnerVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  // if user is not logged in redirect to login page
  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (dataCtx.userId) {
        getWidgetByUserId();
        setSpinnerVisible(false);
      } else {
        router.push("/auth/login");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSpinnerVisible(false);
      }
    })();
  }, [dataCtx.template]);

  return (
    <div className={styles.home_container}>
      {spinnerVisible ? (
        <ThreeCircles
          height="50vh"
          width="50vw"
          color="#4fa94d"
          visible={true}
          outerCircleColor="#05a9f7"
          innerCircleColor="#39c0fa"
          middleCircleColor="#7ad1fa"
          wrapperStyle={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      ) : (
        <>
          <div className={styles.home_background}></div>
          <div className={styles.container}>
            <div className={styles.add_project_card} onClick={handleOpen}>
              <div className={styles.plus_icon}>
                <i className="bi bi-plus-lg" />
              </div>
              <div className={styles.new_proj}>New Project</div>
            </div>
            <Modal open={open} onClose={handleClose}>
              <Modals
                ref={ref}
                getWidget={getWidgetByUserId}
                onClose={handleClose}
              />
            </Modal>
            {dataCtx.template.map((wid, i) => {
              return (
                <Link key={i} passHref href={`/builder/${wid.id}`}>
                  <ProjectCard wid={wid} />
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
