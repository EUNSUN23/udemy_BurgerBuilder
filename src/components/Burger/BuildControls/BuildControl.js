import React from "react";
import styles from "../BuildControls/BuildControl.module.css";

const buildControl = (props) => {
  var type = props.type;

  const onClickAdd = () => {
    props.added(type);
  };

  const onClickRemove = () => {
    props.removed(type);
  };
  return (
    <>
      <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button
          className={styles.Less}
          onClick={onClickRemove}
          disabled={props.disabled}
        >
          Less
        </button>
        <button className={styles.More} onClick={onClickAdd}>
          More
        </button>
      </div>
    </>
  );
};

export default buildControl;
