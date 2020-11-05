import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

//Modal의 state관리는 orderSummary에서 따로 해줌.
//container : state관리함

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  updatePurchaseState(igts) {
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
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      /*<Burger> : 햄버거 이미지, <BuildControls>:버거재료 추가/삭제 버튼, 주문버튼 */
      burger = (
        <>
          <Burger ingredient={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </>
      );
    }

    //외관역할하는 componets>burger의 외관을 여기서 state를 변형시킴으로 바꿔줄것임.
    let orderSummary = null;

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => {
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName });
    },
    onIngredientRemoved: (ingName) => {
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
