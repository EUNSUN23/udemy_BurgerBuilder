import React, { Component } from "react";
import styles from "../Layout/Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  // render할 컴포넌트들의 wrapper역할을 한다.

  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          menuclicked={this.sideDrawerOpenHandler}
        />
        <SideDrawer
          closed={this.sideDrawerCloseHandler}
          open={this.state.showSideDrawer}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, null)(Layout);
