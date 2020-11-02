import React, { Component } from "react";
import styles from "../Modal/Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
//backdrop포함하고 있음. 보통 backdrop은 page 전체랑 관련있기때문에 app에다가 붙이지만,여기선 modal하고 관련이 있기 때문에.

class Modal extends Component {
  componentDidUpdate() {
    console.log("[Modal] will update");
  }

  shouldComponentUpdate(nextProps, nextState) {
    /*
    if (nextProps.show !== this.props.show) {
      return true;
    }
    */
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    ); //loading중 메세지 뜰 때에도 componentUpdate하도록.
  }

  componentDidUpdate() {
    console.log("[Modal] will update");
  }
  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
