import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import BackgroundContext from "../../contexts/background";
import ContextData from "../../contexts/contextData";
import { config } from "../../utils/config";
import styles from "./Navbar.module.css";
import { Alert } from "@mui/material";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const sliderCtx = useContext(BackgroundContext);
  const dataCtx = useContext(ContextData);
  const router = useRouter();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const updateHandler = async () => {
    sliderCtx.setElements("sidebar");
    try {
      const response = await fetch(
        `${config.url}/api/widget/update/${dataCtx.widgetId}`,
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
    } catch (error) {
      console.log(error);
    }
  };

  const copyHandler = () => {
    console.log(sliderCtx);
    let str = `<${sliderCtx.details.type} primaryFont="${sliderCtx.theme.fontColor}" primaryColor="${sliderCtx.theme.primaryColor}" rotation={${sliderCtx.theme.rotation}}`;
    if (sliderCtx.theme.themeNumber === 0) {
      const simplifiedColors = sliderCtx.colors.map(({ color, stop }) => ({
        color,
        stop,
      }));
      const stringifiedColors = JSON.stringify(simplifiedColors)
        .replace(/{"color":"/g, "{ color: '")
        .replace(/","stop":/g, "', stop: ")
        .replace(/"}/g, "' }");
      str += ` backgroundColor={${stringifiedColors}}/>`;
    } else {
      str += ` theme={${sliderCtx.theme.themeNumber}}/>`;
    }
    console.log(str);
    navigator.clipboard.writeText(str);

    // Alert the copied text
    // alert("Copied the text: " + str);
    setOpen(true);
  };

  return (
    <div className={styles.navbar_container}>
      <div className={styles.logo}></div>
      <div className={styles.buttons}>
        <div id="eleven" className={styles.buttons}>
          <div
            className={`${styles.close_btn} ${styles.btn}`}
            onClick={() => {
              sliderCtx.setElements("sidebar");
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
        </div>
        <div
          id="twelve"
          className={`${styles.download_btn} ${styles.btn}`}
          onClick={copyHandler}
        >
          Copy Source Code
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          color="info"
          onClose={handleClose}
          variant="filled"
          // sx={{ width: "100%", background: "#000" }}
        >
          Code Copied to Clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Navbar;
