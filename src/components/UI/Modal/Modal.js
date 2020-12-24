import React, { useEffect, memo } from "react";
import styles from "../Modal/Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
//backdrop포함하고 있음. 보통 backdrop은 page 전체랑 관련있기때문에 app에다가 붙이지만,여기선 modal하고 관련이 있기 때문에.

const Modal = (props) => {
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
