import React, { useContext } from "react";
import { useRouter } from "next/router";
import BackgroundContext from "../../contexts/background";
import ContextData from "../../contexts/contextData";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const sliderCtx = useContext(BackgroundContext);
  const dataCtx = useContext(ContextData);
  const router = useRouter();

  const updateHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/widget/update/${dataCtx.widgetId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: sliderCtx.details.title,
            description: sliderCtx.details.description,
            config: {
              sliderColor: sliderCtx.colors,
              gradientTheme: sliderCtx.theme,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(response.message);
      }

      const responseData = await response.json();
      router.push("/");
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.navbar_container}>
      <div className={styles.logo}></div>
      <div className={styles.buttons}>
        <div
          className={`${styles.close_btn} ${styles.btn}`}
          onClick={() => {
            router.push("/");
          }}
        >
          Close
        </div>
        <div
          className={`${styles.save_btn} ${styles.btn}`}
          onClick={updateHandler}
        >
          Save
        </div>
        <div className={`${styles.download_btn} ${styles.btn}`}>
          Download Source Code
        </div>
      </div>
    </div>
  );
};

export default Navbar;
