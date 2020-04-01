import React, { Component } from "react";

import ModalLicategory from "../../../Modals/ModalLicategory/ModalLicategory";
import stylish from "./IntegralPageCategory.module.css";

class IntegralPageCategory extends Component {
  state = {
    isOpen: false
  };

  handleOnModalTrue = () => {
    this.setState({
      isOpen: true
    });
  };

  handleOnModalFalse = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { id, elem } = this.props;
    return (
      <>
        <div
          className={stylish.cellCatagory}
          id={id}
          onClick={this.handleOnModalTrue}
        >
          <span> {elem.name1}</span>
        </div>
        {this.state.isOpen && (
          <ModalLicategory id={id}>
            <div
              className={stylish.boxName}
              onMouseEnter={this.handleOnModalTrue}
              onMouseLeave={this.handleOnModalFalse}
            >
              <div className={stylish.boxCell}>{elem.name1}</div>
              <div className={stylish.boxCell}>{elem.name2}</div>
              <div className={stylish.boxCell}>{elem.name3}</div>
              <div className={stylish.boxCell}>{elem.name4}</div>
              <div className={stylish.boxCell}>{elem.name5}</div>
              <div className={stylish.boxCell}>{elem.name6}</div>
              <div className={stylish.boxCell}>{elem.name7}</div>
              <div className={stylish.boxCell}>{elem.name8}</div>
              <div className={stylish.boxCell}>{elem.name9}</div>
              <div className={stylish.boxCell}>{elem.name10}</div>
            </div>
          </ModalLicategory>
        )}
      </>
    );
  }
}

export default IntegralPageCategory;
