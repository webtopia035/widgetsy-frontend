import React, { useState, useContext } from "react";
import ContextData from "../../contexts/contextData";
import { config } from "../../utils/config";
import styles from "./Modal.module.css";
const colorInitial = [
  { color: "#ffffff", stop: 0, stopPx: 0 },
  { color: "#000000", stop: 100, stopPx: 800 },
];

const themeInitial = {
  themeNumber: 1,
  primaryColor: "#ffffff",
  fontColor: "#ffffff",
  rotation: 90,
};

const Modals = React.forwardRef((props, ref) => {
  const [widget, setWidget] = useState("");
  const dataCtx = useContext(ContextData);

  const widgetHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.url}/api/widget`, {
        method: "POSt",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: widget.title,
          description: widget.description,
          type: widget.type,
          creator: dataCtx.userId,
          config: {
            sliderColor: colorInitial,
            gradientTheme: themeInitial,
          },
        }),
      });

      const responseData = await response.json();

      dataCtx.setTemplate([...dataCtx.template, responseData.widget]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.add_project_container} ref={ref} tabIndex={-1}>
      <div className={styles.header}>Name your widget</div>
      <div className={styles.header_text}>
        Please enter your widget details.
      </div>
      <form className={styles.form_container} onSubmit={widgetHandler}>
        <label className={styles.labels} htmlFor="widgetName">
          Widget Name <span className={styles.required}>*</span>
        </label>
        <br />
        <input
          required
          className={styles.input}
          name="widgetName"
          type="text"
          onChange={(e) => setWidget({ ...widget, title: e.target.value })}
        />
        <br />
        <label className={styles.labels} htmlFor="widgetName">
          Widget Template <span className={styles.required}>*</span>
        </label>
        <br />
        <select
          className={styles.dropdown}
          name="widgets"
          onChange={(e) => setWidget({ ...widget, type: e.target.value })}
        >
          <option
            defaultValue="none"
            className={styles.menu_items}
            selected
            disabled
            hidden
          >
            -Select an Widget-
          </option>
          <option className={styles.menu_items} htmlFor="widgets">
            Clock
          </option>
          <option className={styles.menu_items} htmlFor="widgets">
            Calculator
          </option>
          <option className={styles.menu_items} htmlFor="widgets">
            Calendar
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
          onChange={(e) =>
            setWidget({ ...widget, description: e.target.value })
          }
        />
        <br />
        <button
          className={styles.create_btn}
          onClick={async () => {
            await props.getWidget();
            props.onClose();
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
});

Modals.displayName = "Modals";

export default Modals;
