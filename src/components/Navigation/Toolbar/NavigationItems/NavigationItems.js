import React from "react";
import styles from "../NavigationItems/NavigationItems.module.css";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Auth</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
