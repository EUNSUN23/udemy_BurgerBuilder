import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import styles from "../LOGO/Logo.module.css";

const logo = (props) => {
  //이미지 경로를 param으로 받음.
  return (
    <div className={styles.Logo} style={{ height: props.height }}>
      <img src={burgerLogo} alt="burger-logo" />
    </div>
  );
};

export default logo;
