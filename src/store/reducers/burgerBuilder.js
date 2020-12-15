import * as actionTypes from "../actions/actionTypes";
import {
  addIngredient,
  removeIngredient,
  setIngredients,
  fetchIngredientsFailed,
} from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action, INGREDIENT_PRICES);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action, INGREDIENT_PRICES);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
