import React, { useContext } from "react";
import BackgroundContext from "../../contexts/background";
import styles from "./ProductInfo.module.css";

const ProductInfo = () => {
  const sliderCtx = useContext(BackgroundContext);

  return (
    <div className={styles.container}>
      <div
        className={styles.back_arrow}
        onClick={() => {
          sliderCtx.setElements("sideBar");
        }}
      >
        <i className="bi bi-arrow-left" />
        Back
      </div>
      <div className={styles.content}>
        <div className={styles.section_name}>General</div>
        <div className={styles.product_info}>Product Information</div>
        <div className={styles.edit_info}>
          <div className={styles.product_name}>
            <div className={styles.name_label}>Product Name</div>
            <div className={styles.example}>E.g. Clock Widget</div>
            <input
              placeholder="Product name"
              className={styles.name_input}
              type="text"
            />
            <div className={styles.file_name}>File Name: clock_widget</div>
          </div>
          <div className={styles.product_description}>
            <div className={styles.description_label}>Product Description</div>
            <textarea
              placeholder="Product description..."
              className={styles.textarea}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
