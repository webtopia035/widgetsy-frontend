import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { config } from "../../utils/config";
import Joyride from "react-joyride";
import useWalkThrough from "../../hooks/useWalkThrough";
import ContextData from "../../contexts/contextData";
import BackgroundContext from "../../contexts/background";
import Editor from "../../components/Editor/Editor";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "../../styles/builder.module.css";

const Builder = () => {
  const router = useRouter();
  const dataCtx = useContext(ContextData);
  const sliderCtx = useContext(BackgroundContext);
  const productId = router.query.builder;
  dataCtx.setWidgetId(productId);

  useEffect(() => {
    if (productId) {
      const fetchWidgetData = async () => {
        try {
          const response = await fetch(
            `${config.url}/api/widget/${productId}`,
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

          sliderCtx.setColors(responseData.widget.config.sliderColor);
          sliderCtx.setTheme(responseData.widget.config.gradientTheme);
          sliderCtx.setDetails({
            title: responseData.widget.title,
            description: responseData.widget.description,
            type: responseData.widget.type,
          });
          sliderCtx.setAngle(responseData.widget.config.gradientTheme.rotation);
        } catch (error) {
          console.log(error);
        }
      };
      fetchWidgetData();
    }
  }, [productId]);
  const {
    run,
    steps,
    stepIndex,
    currentStep,
    handleStart,
    handleJoyrideCallback,
  } = useWalkThrough();
  return (
    <div className={styles.builder_page}>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        run={run}
        showProgress
        showSkipButton
        steps={steps}
        hideBackButton={true}
        styles={{
          options: {
            arrowColor: "#edf0ef",
            backgroundColor: "#292929",
            primaryColor: "#00a2ff",
            textColor: "#edf0ef",
            spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
        }}
      />
      <Navbar />
      <div className={styles.container}>
        <Sidebar />
        <Editor />
        <div>
          <button className={styles.btn} onClick={handleStart}>
            WT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Builder;
