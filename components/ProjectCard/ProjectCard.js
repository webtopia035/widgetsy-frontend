import React, { useContext } from "react";
import ContextData from "../../contexts/contextData";
import styles from "./ProjectCard.module.css";

const ProjectCard = React.forwardRef((props, ref) => {
  const dataCtx = useContext(ContextData);
  const deleteHandler = async (e) => {
    e.preventDefault();

    let temp = dataCtx.template;
    const index = temp.indexOf(props.wid);
    if (index > -1) {
      temp.splice(index, 1);
    }

    dataCtx.setTemplate([...temp]);
    try {
      const response = await fetch(
        `http://localhost:8000/api/widget/${props.wid.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    >
      <div className={styles.project_icon}>
        <div className={styles.project_delete} onClick={deleteHandler}>
          <i className="bi bi-trash3-fill"></i>
        </div>
      </div>
      <div className={styles.project_name}>{props.wid.title}</div>
      <div className={styles.project_date}>date</div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
