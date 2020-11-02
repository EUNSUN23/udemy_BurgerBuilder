import React, { Component } from "react";
import styles from "../BurgerIngredient/BurgerIngredient.module.css";
import PropTypes from "prop-types";

//BurgetIngredient css를 화면으로 구현하기 위한 파일. ()
class BurgerIngredient extends Component {
  render() {
    let ingredient = null;
    switch (
      this.props.type //넘겨받는 props의 type가 무엇이냐에 따라 다른 css붙은 div만듦.
    ) {
      case "bread-bottom":
        ingredient = <div className={styles.BreadBottom}></div>;
        break;

      case "bread-top":
        ingredient = (
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1}></div>
            <div className={styles.Seeds2}></div>
          </div>
        );
        break;
      case "meat":
        ingredient = <div className={styles.Meat}></div>;
        break;

      case "cheese":
        ingredient = <div className={styles.Cheese}></div>;
        break;

      case "bacon":
        ingredient = <div className={styles.Bacon}></div>;
        break;

      case "salad":
        ingredient = <div className={styles.Salad}></div>;
        break;
      default:
        ingredient = null; //잘못된 값이 넘어왔을 경우 null.
    }

    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired, //BurgerIngredient 컴포넌트를 type을 안 넘겨주고 쓰려고 하면 에러 발생함.
};

export default BurgerIngredient;
