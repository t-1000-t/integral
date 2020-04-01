import React, { Component, createRef } from "react";

// import ModalLicategory from "../../Modals/ModalLicategory/ModalLicategory";
// import IntegralPageCategorySub from "./IntegralPageCategorySub/IntegralPageCategorySub";
import IntegralPageCategory from "./IntegralPageCategory/IntegralPageCategory";

import stylish from "./IntegralPage.module.css";

class IntegralPage extends Component {
  state = {
    arrCategory: [
      { id: "002", name: "Планшеты" },
      { id: "001", name: "Ноутбуки" },
      { id: "003", name: "Компьютеры" },
      { id: "004", name: "Комплектующие" },
      { id: "005", name: "Смартфоны" },
      { id: "006", name: "Принтеры" },
      { id: "007", name: "Сетевое оборудование" },
      { id: "008", name: "Телевизоры и проекторы" },
      { id: "009", name: "Наушники" },
      { id: "010", name: "Бытовая техника" }
    ],
    isOpenArrCategory: false,
    isOpenNameCategory: null
  };

  toggleTrue = () => {
    this.setState({ isOpenArrCategory: true });
  };

  toggleFalse = () => {
    this.setState({ isOpenArrCategory: false });
  };

  liHandlerCategoryTrue = e => {
    e.preventDefault();
    this.setState({
      isOpenModalLiCategory: true,
      selected: e.target.id
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
  };

  handleBackdropClick = e => {
    // console.log(this.btnRef.current);
    // console.log(e.target);
    if (this.btnRef.current && e.target !== this.btnRef.current) {
      return;
    }

    this.toggleFalse();
  };

  render() {
    const { arrCategory, isOpenArrCategory } = this.state;
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
                    {arrCategory.map(el => (
                      <li className={stylish.liList} key={el.id}>
                        <IntegralPageCategory
                          id={el.id}
                          name={el.name}
                          liHandlerCategoryTrue={this.liHandlerCategoryTrue}
                          className={stylish.liNameCategory}
                        />
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
