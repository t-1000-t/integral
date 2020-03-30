import React, { Component, createRef } from "react";

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
    isOpenArrCategory: false
  };

  toggleTrue = () => {
    this.setState({ isOpenArrCategory: true });
  };

  toggleFalse = () => {
    this.setState({ isOpenArrCategory: false });
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
    console.log(this.btnRef.current);
    console.log(e.target);
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
            <div
              className={stylish.btnList}
              onMouseEnter={this.toggleTrue}
              onMouseLeave={this.toggleFalse}
            >
              <button onClick={this.toggleTrue} onMouseEnter={this.toggleTrue}>
                Shop By Catalog
              </button>
              <ul
                className={stylish.ulList}
                onMouseEnter={this.toggleTrue}
                onMouseLeave={this.toggleFalse}
                onClick={this.handleBackdropClick}
              >
                {isOpenArrCategory &&
                  arrCategory.map((el, i) => (
                    <li className={stylish.liList} key={i}>
                      {el.name}
                    </li>
                  ))}
              </ul>
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
