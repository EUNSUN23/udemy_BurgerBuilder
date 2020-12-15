export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const addIngredient = (state, action, ingredientPrices) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + ingredientPrices[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

export const removeIngredient = (state, action, ingredientPrices) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - ingredientPrices[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedSt);
};

export const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.salad,
      meat: action.ingredients.salad,
    },
    error: false,
    totalPrice: 4,
    building: false,
  });
};

export const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

export const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

export const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

export const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

export const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};

export const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

export const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: true });
};

export const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

export const checkValidity = (value, rules) => {
  let isValid = true; //true인 상태로 시작, 조건문 훑으면서 false/true 결정
  if (!rules) {
    //validation이 false면(selectbox등 validation이 필요없는경우) 바로 true반환
    return true;
  }
  if (rules.required) {
    //칸이 채워졌으면(required)
    isValid = value.trim() !== "" && isValid;
    //isValid should be equal to value
    //if it(value) is not equal to an empry string
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    //isValid 계속 붙이는 이유는 위의 조건 하나라도 fail하면 안돼기 때문에.
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  return isValid;
};
