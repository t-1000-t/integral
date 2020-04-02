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
    const { isOpen } = this.state;
    return (
      <div
        className={stylish.wrapperCategory}
        onMouseLeave={this.handleOnModalFalse}
      >
        <div
          className={stylish.cellCatagory}
          id={id}
          onMouseEnter={this.handleOnModalTrue}
          // onMouseLeave={this.handleOnModalFalse}
        >
          <span> {elem.name1}</span>
        </div>
        {isOpen && (
          <ModalLicategory id={id}>
            <div
              className={stylish.boxName}
              onMouseLeave={this.handleOnModalFalse}
              onMouseEnter={this.handleOnModalTrue}
            >
              <div className={stylish.boxCell}>
                <div className={stylish.fontName}>{elem.name1}</div>
              </div>
              <div className={stylish.boxCell}>
                <div className={stylish.fontName}>{elem.name2}</div>
              </div>
              <div className={stylish.boxCell}>
                <div className={stylish.fontName}>{elem.name3}</div>
              </div>
              <div className={stylish.boxCell}>
                <div className={stylish.fontName}>{elem.name4}</div>
              </div>
              <div className={stylish.boxCell}>
                <div className={stylish.fontName}>{elem.name5}</div>
              </div>
              <div className={stylish.boxCell}>
                <div className={stylish.fontName}>{elem.name6}</div>
              </div>
              <div className={stylish.boxCell}>
                <div className={stylish.fontName}>{elem.name7}</div>
              </div>
              <div className={stylish.boxCell}>
                <div className={stylish.fontName}>{elem.name8}</div>
              </div>
              <div className={stylish.boxCell}>
                <div className={stylish.fontName}>{elem.name9}</div>
              </div>
              <div className={stylish.boxCell}>
                <div className={stylish.fontName}>{elem.name10}</div>
              </div>
            </div>
          </ModalLicategory>
        )}
      </div>
    );
  }
}

export default IntegralPageCategory;
