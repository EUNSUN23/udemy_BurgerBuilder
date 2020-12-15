import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

//action creator이름은 actionTypes와 동일하게.

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

//비동기로 동작하는 initIngredients안에 들어가는 sync함수.
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  //due to redux-thunk, can return function that has dispatch as an argument.
  return (dispatch) => {
    axios
      .get("https://burgerbuilder-react-redux.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
