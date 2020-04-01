import React, { Component } from "react";

import ModalLicategory from "../../../Modals/ModalLicategory/ModalLicategory";
// import stylish from "./IntegralPageCategory.module.css";

class IntegralPageCategory extends Component {
  state = {
    isOpen: false
  };

  handleOnModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  render() {
    const { id, name } = this.props;
    return (
      <>
        <div
          id={id}
          onMouseEnter={this.handleOnModal}
          ref={this.categoryNameRef}
        >
          {name}
        </div>
        {this.state.isOpen && <ModalLicategory id={id}>{name}</ModalLicategory>}
      </>
    );
  }
}

export default IntegralPageCategory;
