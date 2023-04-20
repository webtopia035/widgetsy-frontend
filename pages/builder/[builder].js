import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { config } from "../../utils/config";
import ContextData from "../../contexts/contextData";
import BackgroundContext from "../../contexts/background";
import Editor from "../../components/Editor/Editor";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "../../styles/Builder.module.css";

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

export default Builder;
