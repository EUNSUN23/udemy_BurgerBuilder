import React from "react";
import styles from "../BuildControls/BuildControls.module.css";
import BuildControl from "../BuildControls/BuildControl";
//BuildControl wrapper역할을 한다.
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <>
      <div className={styles.BuildControls}>
        <p>
          Current Price : <strong>{props.price.toFixed(2)}</strong>
        </p>
        {controls.map((
          ctrl //배열 constrols의 각 요소를 BuildControl(재료별 버튼)으로 컴포넌트화
        ) => (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={props.ingredientAdded}
            removed={props.ingredientRemoved}
            type={ctrl.type}
            disabled={props.disabled[ctrl.type]}
          />
        ))}
        <button
          className={styles.OrderButton}
          disabled={!props.purchasable}
          onClick={props.ordered}
        >
          ORDER NOW
        </button>
      </div>
    </>
  );
};

export default buildControls;
