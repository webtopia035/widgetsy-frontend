import React, { useState } from "react";
import styles from "./Modal.module.css";

const Modals = React.forwardRef((props, ref) => {
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className={styles.add_project_container} ref={ref}>
      <div className={styles.header}>Name your widget</div>
      <div className={styles.header_text}>
        Please enter your widget details.
      </div>
      <form className={styles.form_container}>
        <label className={styles.labels} htmlFor="widgetName">
          Widget Name <span className={styles.required}>*</span>
        </label>
        <br />
        <input
          required
          className={styles.input}
          name="widgetName"
          type="text"
        />
        <br />
        <label className={styles.labels} htmlFor="widgetName">
          Widget Template <span className={styles.required}>*</span>
        </label>
        <br />
        <select className={styles.dropdown} name="widgets">
          <option className={styles.menu_items} htmlFor="widgets">
            Clock
          </option>
          <option className={styles.menu_items} htmlFor="widgets">
            Calculator
          </option>
          <option className={styles.menu_items} htmlFor="widgets">
            White Board
          </option>
        </select>
        <br />
        <label className={styles.labels} htmlFor="widgetName">
          Widget Description <span className={styles.required}>*</span>
        </label>
        <br />
        <textarea
          required
          className={styles.textarea}
          name="widgetName"
          rows="4"
        />
        <br />
        <input className={styles.create_btn} type="submit" value="Create" />
      </form>
    </div>
  );
});

Modals.displayName = "Modals";

export default Modals;
