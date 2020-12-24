import React, { useEffect, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./container/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

//This is the root component of our app and it's always loaded, no matter which
//route we visit. So this makes for a great app to check our authentication status.

// const asyncCheckout = asyncComponent(() => {
//   return import("./container/Checkout/Checkout");
// });

const Checkout = React.lazy(() => {
  return import("./container/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import("./container/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./container/Auth/Auth");
});

const App = (props) => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  //Auth.js에서 /checkout으로 redirect 시키는데, App이 매번 렌더링 할 때마다 페이지 라우팅이
  //일어나기때문에 현재 path가 /checkout로 바뀌어서 Checkout컴포넌트 렌더링해주는 과정에
  //Auth가 없으면 이 라우팅도 동작하지 않음.

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <>
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Layout>
      </div>
    </>
  );
};

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
