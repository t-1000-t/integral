import React, { Component, createRef } from "react";
import { createPortal } from "react-dom";

import stylish from "./ModalProductDetails.module.css";

const PANEL_PRODUCT_DATEILS = document.getElementById("panel-dateils-root");

class ModalProductDetails extends Component {
  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = e => {
    console.log(e);

    if (e.code !== "Escape") {
      return;
    }

    this.props.handleOnModal();
  };

  handleBackdropClick = e => {
    if (this.backdropRef.current && e.target !== this.backdropRef.current) {
      return;
    }

    this.props.handleOnModal();
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
        <div className={stylish.modal}>{children}</div>
      </div>,
      PANEL_PRODUCT_DATEILS
    );
  }
}

export default ModalProductDetails;
