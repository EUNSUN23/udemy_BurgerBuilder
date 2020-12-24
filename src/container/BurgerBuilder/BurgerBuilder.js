import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

//Modal의 state관리는 orderSummary에서 따로 해줌.
//container : state관리함

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onIngredientAdded = (ingName) => {
    dispatch(actions.addIngredient(ingName));
  };
  const onIngredientRemoved = (ingName) => {
    dispatch(actions.removeIngredient(ingName));
  };
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });

  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (igts) => {
    // buildcontrol의 'more'(추가) 혹은 'less'(삭제)버튼 클릭시 실행.
    //ingredients의 개수 모두 더해서 0이상이면 purchasable을 true로.

    const sum = Object.keys(igts)
      .map((igKey) => {
        return igts[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (ings) {
    /*<Burger> : 햄버거 이미지, <BuildControls>:버거재료 추가/삭제 버튼, 주문버튼 */
    burger = (
      <>
        <Burger ingredient={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </>
    );
  }

  //외관역할하는 componets>burger의 외관을 여기서 state를 변형시킴으로 바꿔줄것임.
  let orderSummary = null;

  if (ings) {
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  if (loading) {
    orderSummary = <Spinner />;
  }
  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
