import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./container/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

//This is the root component of our app and it's always loaded, no matter which
//route we visit. So this makes for a great app to check our authentication status.

const asyncCheckout = asyncComponent(() => {
  return import("./container/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./container/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./container/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    //로그인 상태에서 접근할 수 있는 라우트와 그렇지 않을 때 접근가능한 라우트 분리.
    //자바스크립트 코드라서 얼마든지 수정해서 protected라우트에 접근할 수 있음.
    //그래서 서버쪽에 protecting method를 마련해 둔 것.
    //Redirect 역할 :
    //로그인 안 한 상태로 order나 checkout 접근하려고 하면 접근이 fail되면서 path가 ??
    //상태가 될 때 /auth도 /도 아니게 되면서 맨 마지막 redirecting 일어남.
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    //Auth.js에서 /checkout으로 redirect 시키는데, App이 매번 렌더링 할 때마다 페이지 라우팅이
    //일어나기때문에 현재 path가 /checkout로 바뀌어서 Checkout컴포넌트 렌더링해주는 과정에
    //Auth가 없으면 이 라우팅도 동작하지 않음.

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <>
        <div>
          <Layout>{routes}</Layout>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

//connect를 사용하면 index.js로부터 받는 route를 못받음. 그래서 withRouter 사용.
