import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import thunk from "redux-thunk";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";

//composeEnhancers function allows us to pass applyMiddleware as an argument.
//compose allows us to compose our own set of enhancers and middleware is just
//one kind of enhancer. dev tools would be another example.
//redux-devtools에서 지원하는 compose를 쓰던가, redux에 내장되어있는 compose를 쓰던가.

//환경변수 이용해서 개발 모드에서만 redux devtools unlock하기
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  orders: orderReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
