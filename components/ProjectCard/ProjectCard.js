import React, { useContext, useState } from "react";
import ContextData from "../../contexts/contextData";
import { config } from "../../utils/config";
import WidgetIcon from "../Widgets/WidgetIcon";
import styles from "./ProjectCard.module.css";

const ProjectCard = React.forwardRef((props, ref) => {
  const [hover, setHover] = useState(false);
  const dataCtx = useContext(ContextData);
  // console.log(props);
  const deleteHandler = async (e) => {
    e.preventDefault();

    let temp = dataCtx.template;
    const index = temp.indexOf(props.wid);
    if (index > -1) {
      temp.splice(index, 1);
    }

    dataCtx.setTemplate([...temp]);
    try {
      const response = await fetch(`${config.url}/api/widget/${props.wid.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.message);
      }

      // const responseData = await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      href={props.href}
      onClick={props.onClick}
      ref={ref}
      className={styles.project_card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.project_icon}>
        <WidgetIcon hover={hover} type={props.wid.type} />
      </div>
      <div className={styles.project_name}>{props.wid.title}</div>
      <div className={styles.project_delete} onClick={deleteHandler}>
        <i className="bi bi-trash3-fill"></i>
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
