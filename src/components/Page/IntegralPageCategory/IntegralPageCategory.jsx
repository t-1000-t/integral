import React, { Component, createRef } from "react";
import { NavLink } from "react-router-dom";
import ModalLicategory from "../../Modals/ModalLicategory/ModalLicategory";
import routes from "../../../routes/routes";
import stylish from "./IntegralPageCategory.module.css";
// npm install --save-dev @iconify/react @iconify/icons-ion
import { Icon } from "@iconify/react";
import chevronForward from "@iconify/icons-ion/chevron-forward";

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

  handleOnModalChange = () => {
    this.setState({ isOpen: !this.state.isOpen });
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

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { id, elem } = this.props;
    const { isOpen } = this.state;
    return (
      <div
        className={stylish.wrapperCategory}
        onMouseLeave={this.handleOnModalFalse}
      >
        <div
          className={isOpen ? stylish.cellCatagoryIcon : stylish.cellCatagory}
          id={id}
          // onMouseEnter={this.handleOnModalTrue}
          // onMouseLeave={this.handleOnModalFalse}
          onClick={this.handleOnModalTrue}
        >
          <div className={stylish.categoryName}>{elem.name1}</div>
          {isOpen ? (
            <Icon className={stylish.iconCategoryIcon} icon={chevronForward} />
          ) : null}
        </div>
        {isOpen && (
          <ModalLicategory
            id={id}
            handleOnModalChange={this.handleOnModalChange}
          >
            <div
              ref={this.btnBoxRef}
              className={stylish.boxName}
              // onMouseLeave={this.handleOnModalFalse}
              // onMouseEnter={this.handleOnModalTrue}
              onClick={this.handleOnModalChange}
            >
              <NavLink
                className={stylish.boxCellNavLink}
                to={{
                  pathname: routes.PRODUCTS,
                  search: `?category=${elem.category1}`,
                }}
              >
                <button className={stylish.boxCell}>
                  <div className={stylish.fontName}>{elem.name1}</div>
                </button>
              </NavLink>

              <NavLink
                className={stylish.boxCellNavLink}
                to={{
                  pathname: routes.PRODUCTS,
                  search: `?category=${elem.category2}`,
                }}
              >
                <button className={stylish.boxCell}>
                  <div className={stylish.fontName}>{elem.name2}</div>
                </button>
              </NavLink>

              <NavLink
                className={stylish.boxCellNavLink}
                to={{
                  pathname: routes.PRODUCTS,
                  search: `?category=${elem.category3}`,
                }}
              >
                <button className={stylish.boxCell}>
                  <div className={stylish.fontName}>{elem.name3}</div>
                </button>
              </NavLink>

              <NavLink
                className={stylish.boxCellNavLink}
                to={{
                  pathname: routes.PRODUCTS,
                  search: `?category=${elem.category4}`,
                }}
              >
                <button className={stylish.boxCell}>
                  <div className={stylish.fontName}>{elem.name4}</div>
                </button>
              </NavLink>

              <NavLink
                className={stylish.boxCellNavLink}
                to={{
                  pathname: routes.PRODUCTS,
                  search: `?category=${elem.category5}`,
                }}
              >
                <button className={stylish.boxCell}>
                  <div className={stylish.fontName}>{elem.name5}</div>
                </button>
              </NavLink>

              <NavLink
                className={stylish.boxCellNavLink}
                to={{
                  pathname: routes.PRODUCTS,
                  search: `?category=${elem.category6}`,
                }}
              >
                <button className={stylish.boxCell}>
                  <div className={stylish.fontName}>{elem.name6}</div>
                </button>
              </NavLink>

              <NavLink
                className={stylish.boxCellNavLink}
                to={{
                  pathname: routes.PRODUCTS,
                  search: `?category=${elem.category7}`,
                }}
              >
                <button className={stylish.boxCell}>
                  <div className={stylish.fontName}>{elem.name7}</div>
                </button>
              </NavLink>

              <NavLink
                className={stylish.boxCellNavLink}
                to={{
                  pathname: routes.PRODUCTS,
                  search: `?category=${elem.category8}`,
                }}
              >
                <button className={stylish.boxCell}>
                  <div className={stylish.fontName}>{elem.name8}</div>
                </button>
              </NavLink>

              <NavLink
                className={stylish.boxCellNavLink}
                to={{
                  pathname: routes.PRODUCTS,
                  search: `?category=${elem.category9}`,
                }}
              >
                <button className={stylish.boxCell}>
                  <div className={stylish.fontName}>{elem.name9}</div>
                </button>
              </NavLink>

              <NavLink
                className={stylish.boxCellNavLink}
                to={{
                  pathname: routes.PRODUCTS,
                  search: `?category=${elem.category10}`,
                }}
              >
                <button className={stylish.boxCell}>
                  <div className={stylish.fontName}>{elem.name10}</div>
                </button>
              </NavLink>

              <NavLink
                className={stylish.boxCellNavLink}
                to={{
                  pathname: routes.PRODUCTS,
                  search: `?category=${elem.category11}`,
                }}
              >
                <button className={stylish.boxCell}>
                  <div className={stylish.fontName}>{elem.name11}</div>
                </button>
              </NavLink>
            </div>
          </ModalLicategory>
        )}
      </div>
    );
  }
}

export default IntegralPageCategory;
