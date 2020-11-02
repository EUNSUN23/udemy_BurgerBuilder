import React from "react";
import styles from "../Button/Button.module.css";

const button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={[styles.Button, styles[props.btnType]].join("")} //기본 버튼css, 버튼종류css(부모한테서 props로 받는 btnType에 따라 달라짐.)
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default button;
