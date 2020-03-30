import React, { Component, createRef } from "react";

import ModalLicategory from "../../Modals/ModalLicategory/ModalLicategory";

import stylish from "./IntegralPage.module.css";

export class IntegralPage extends Component {
  state = {
    arrCategory: [
      { name: "Ноутбуки" },
      { name: "Планшеты" },
      { name: "Компьютеры" },
      { name: "Комплектующие" },
      { name: "Смартфоны" },
      { name: "Принтеры" },
      { name: "Сетевое оборудование" },
      { name: "Телевизоры и проекторы" },
      { name: "Наушники" },
      { name: "Бытовая техника" }
    ],
    isOpenArrCategory: false,
    isOpenModalLiCategory: false
  };

  toggleTrue = () => {
    this.setState({ isOpenArrCategory: true });
  };

  toggleFalse = () => {
    this.setState({ isOpenArrCategory: false });
  };

  liHandlerCategoryTrue = () => {
    this.setState({
      isOpenModalLiCategory: true
    });
  };

  liHandlerCategoryFalse = () => {
    this.setState({
      isOpenModalLiCategory: false
    });
  };

  // toggle for on click

  btnRef = createRef();

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

    this.toggleFalse();
    this.liHandlerCategoryFalse();
  };

  handleBackdropClick = e => {
    console.log(this.btnRef.current);
    console.log(e.target);
    if (this.btnRef.current && e.target !== this.btnRef.current) {
      return;
    }

    this.toggleFalse();
    this.liHandlerCategoryFalse();
  };

  render() {
    const {
      arrCategory,
      isOpenArrCategory,
      isOpenModalLiCategory
    } = this.state;
    return (
      <div className={stylish.wrapper}>
        <div className={stylish.container}>
          <div className={stylish.boxNavMenu}>
            <div className={stylish.btnList}>
              <button
                onClick={this.toggleTrue}
                onMouseEnter={this.toggleTrue}
                className={stylish.btnTest}
              >
                Shop By Catalog
              </button>
              <div
                className={stylish.boxTest}
                ref={this.btnRef}
                onClick={this.handleBackdropClick}
                onMouseLeave={this.toggleFalse}
              >
                {isOpenArrCategory && (
                  <ul
                    className={stylish.ulList}
                    onMouseEnter={this.toggleTrue}
                    // onMouseLeave={this.toggleFalse}
                    onClick={this.handleBackdropClick}
                  >
                    {arrCategory.map((el, i) => (
                      <li className={stylish.liList} key={i}>
                        <div
                          onMouseEnter={this.liHandlerCategoryTrue}
                          className={stylish.liNameCategory}
                        >
                          {el.name}
                        </div>

                        {isOpenModalLiCategory && (
                          <div
                            className={stylish.backdropLiNameCategory}
                            onMouseEnter={this.liHandlerCategoryTrue}
                          >
                            111111111111111111
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <input />
            <div>Phone namber</div>
            <div>about</div>
          </div>
        </div>
      </div>
    );
  }
}

export default IntegralPage;
