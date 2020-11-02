import React from "react";
import styles from "../Toolbar/Toolbar.module.css";
import Logo from "../../LOGO/Logo";
import NavigationItems from "../Toolbar/NavigationItems/NavigationItems";

const toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <button className={styles.MenuBtn} onClick={props.menuclicked}>
        MENU
      </button>
      <Logo height="80%" />
      <nav className={styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
