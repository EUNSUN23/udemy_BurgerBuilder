import React from "react";
import styles from "../Burger/Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let transformedIngr = Object.keys(props.ingredient)
    .map((igk) => {
      return [...Array(props.ingredient[igk])].map((_, i) => {
        return <BurgerIngredient key={igk + i} type={igk} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngr.length === 0) {
    transformedIngr = <p>재료를 추가하세요!</p>;
  }
  return (
    <>
      <div className={styles.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngr}
        <BurgerIngredient type="bread-bottom" />
      </div>
    </>
  );
};

export default burger;
