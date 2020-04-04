import React, { Component, createRef } from "react";
import { NavLink } from "react-router-dom";
import ModalLicategory from "../../Modals/ModalLicategory/ModalLicategory";
import routes from "../../../routes/routes";
import stylish from "./IntegralPageCategory.module.css";

class IntegralPageCategory extends Component {
  state = {
    isOpen: false,
  };

  handleOnModalTrue = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleOnModalFalse = () => {
    this.setState({
      isOpen: false,
    });
  };

  // btn toggle BoxCategory

  btnBoxRef = createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    console.log(e);

    if (e.code !== "Escape") {
      return;
    }

    this.handleOnModalFalse();
  };

  handleBackdropClick = (e) => {
    if (this.btnBoxRef.current && e.target !== this.btnBoxRef.current) {
      return;
    }

    this.handleOnModalFalse();
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
          onMouseLeave={this.handleOnModalFalse}
          // onClick={this.handleOnModalTrue}
        >
          <span> {elem.name1}</span>
        </div>
        {isOpen && (
          <ModalLicategory id={id}>
            <div
              ref={this.btnBoxRef}
              className={stylish.boxName}
              onMouseLeave={this.handleOnModalFalse}
              onMouseEnter={this.handleOnModalTrue}
              // onClick={this.handleOnModalTrue}
            >
              <div className={stylish.boxCell}>
                <NavLink
                  className={stylish.fontName}
                  to={{
                    pathname: routes.PRODUCTS,
                    search: `?category=${elem.category1}`,
                  }}
                >
                  {elem.name1}
                </NavLink>
              </div>
              <div className={stylish.boxCell}>
                <NavLink
                  className={stylish.fontName}
                  to={{
                    pathname: routes.PRODUCTS,
                    search: `?category=${elem.category2}`,
                  }}
                >
                  {elem.name2}
                </NavLink>
              </div>
              <div className={stylish.boxCell}>
                <NavLink
                  className={stylish.fontName}
                  to={{
                    pathname: routes.PRODUCTS,
                    search: `?category=${elem.category3}`,
                  }}
                >
                  {elem.name3}
                </NavLink>
              </div>
              <div className={stylish.boxCell}>
                <NavLink
                  className={stylish.fontName}
                  to={{
                    pathname: routes.PRODUCTS,
                    search: `?category=${elem.category4}`,
                  }}
                >
                  {elem.name4}
                </NavLink>
              </div>
              <div className={stylish.boxCell}>
                <NavLink
                  className={stylish.fontName}
                  to={{
                    pathname: routes.PRODUCTS,
                    search: `?category=${elem.category5}`,
                  }}
                >
                  {elem.name5}
                </NavLink>
              </div>
              <div className={stylish.boxCell}>
                <NavLink
                  className={stylish.fontName}
                  to={{
                    pathname: routes.PRODUCTS,
                    search: `?category=${elem.category6}`,
                  }}
                >
                  {elem.name6}
                </NavLink>
              </div>
              <div className={stylish.boxCell}>
                <NavLink
                  className={stylish.fontName}
                  to={{
                    pathname: routes.PRODUCTS,
                    search: `?category=${elem.category7}`,
                  }}
                >
                  {elem.name7}
                </NavLink>
              </div>
              <div className={stylish.boxCell}>
                <NavLink
                  className={stylish.fontName}
                  to={{
                    pathname: routes.PRODUCTS,
                    search: `?category=${elem.category8}`,
                  }}
                >
                  {elem.name8}
                </NavLink>
              </div>
              <div className={stylish.boxCell}>
                <NavLink
                  className={stylish.fontName}
                  to={{
                    pathname: routes.PRODUCTS,
                    search: `?category=${elem.category9}`,
                  }}
                >
                  {elem.name9}
                </NavLink>
              </div>
              <div className={stylish.boxCell}>
                <NavLink
                  className={stylish.fontName}
                  to={{
                    pathname: routes.PRODUCTS,
                    search: `?category=${elem.category10}`,
                  }}
                >
                  {elem.name10}
                </NavLink>
              </div>
            </div>
          </ModalLicategory>
        )}
      </div>
    );
  }
}

export default IntegralPageCategory;
