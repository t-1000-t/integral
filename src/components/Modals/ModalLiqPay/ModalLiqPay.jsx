import React, { Component, createRef } from "react";
import { createPortal } from "react-dom";

import stylish from "./ModalLiqPay.module.css";

const MODAL_LIQPAY_CHECKOUT = document.getElementById("liqpay_checkout");

class ButtonLiqPay extends Component {
  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.code !== "Escape") {
      return;
    }

    this.props.onClose();
  };

  handleBackdropClick = (e) => {
    if (this.backdropRef.current && e.target !== this.backdropRef.current) {
      return;
    }

    this.props.onClose();
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div
        className={stylish.backdrop}
        ref={this.backdropRef}
        onClick={this.handleBackdropClick}
        role="presentation"
      >
        {/* {children} */}
        <div className={stylish.modal}>{children}</div>
      </div>,
      MODAL_LIQPAY_CHECKOUT
    );
  }
}

export default ButtonLiqPay;
