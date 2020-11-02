import React from "react";
import styles from "../NavigationItem/NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => {
  // 링크에도 css 줄것이라 따로 뺐다고 한다.
  return (
    <li className={styles.NavigationItem}>
      <NavLink
        exact={props.exact}
        to={props.link}
        activeClassName={styles.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
