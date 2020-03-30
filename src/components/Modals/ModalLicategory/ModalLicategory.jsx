import React, { Component, createRef } from "react";
import { createPortal } from "react-dom";

import stylish from "./ModalLicategory.module.css";

const MODAL_LICATEGORY = document.getElementById("modal-licategory-root");

class ModalLicategory extends Component {
  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== "Escape") {
      return;
    }

    this.props.liHandlerCategoryFalse();
  };

  handleBackdropClick = e => {
    if (this.backdropRef.current && e.target !== this.backdropRef.current) {
      return;
    }

    this.props.liHandlerCategoryFalse();
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
      MODAL_LICATEGORY
    );
  }
}

export default ModalLicategory;
