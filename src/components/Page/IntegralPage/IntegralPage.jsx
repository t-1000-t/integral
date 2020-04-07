import React, { Component, createRef } from "react";
import routes from "../../../routes/routes";
// import ModalLicategory from "../../Modals/ModalLicategory/ModalLicategory";
// import IntegralPageCategorySub from "./IntegralPageCategorySub/IntegralPageCategorySub";
import IntegralPageCategory from "../IntegralPageCategory/IntegralPageCategory";
import Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";

import stylish from "./IntegralPage.module.css";

class IntegralPage extends Component {
  state = {
    arrCategory: [
      {
        id: "001",
        name1: "Ноутбуки",
        category1: "1191",
        name2: "Аксессуары для ноутбуков",
        category2: "1211",
        name3: "Комплектующие к ноутбукам",
        category3: "1233",
        name4: "Запчасти для ноутбуков",
        category4: "8568",
        name5: "Сумки к ноутбукам",
        category5: "1204",
        name6: "Рюкзаки к ноутбукам",
        category6: "1205",
        name7: "Подставки для ноутбуков",
        category7: "1471",
        name8: "Матриця до ноутбука",
        category8: "8516",
        name9: "Модули памяти к ноутбукам",
        category9: "1237",
        name10: "Ноутбуки, планшеты",
        category10: "1181",
      },
      {
        id: "002",
        name1: "Планшеты",
        category1: "1192",
        name2: "Аксессуары для планшетов",
        category2: "7981",
        name3: "Чехлы к планшетам",
        category3: "1207",
        name4: "Электронные книги",
        category4: "1194",
        name5: "Ноутбуки, планшеты",
        category5: "1181",
        name6: "",
        category6: "",
        name7: "",
        category7: "",
        name8: "",
        category8: "",
        name9: "",
        category9: "",
        name10: "",
        category10: "",
      },
      {
        id: "003",
        name1: "Компьютеры",
        category1: "1053",
        name2: "Компьютеры, аксессуары",
        category2: "1331",
        name3: "Модули памяти для компьютера",
        category3: "1334",
        name4: "Компьютерные игры",
        category4: "1418",
        name5: "Компьютерные игры Доп. раздел",
        category5: "8366",
        name6: "",
        category6: "",
        name7: "",
        category7: "",
        name8: "",
        category8: "",
        name9: "",
        category9: "",
        name10: "",
        category10: "",
      },
      { id: "004", name1: "Комплектующие" },
      { id: "005", name1: "Смартфоны" },
      { id: "006", name1: "Принтеры" },
      { id: "007", name1: "Сетевое оборудование" },
      { id: "008", name1: "Телевизоры и проекторы" },
      { id: "009", name1: "Наушники" },
      { id: "010", name1: "Бытовая техника" },
    ],
    isOpenArrCategory: false,
    isOpenNameCategory: null,
    isLoading: false,
    arrMain: [],
  };

  toggleTrue = () => {
    this.setState({ isOpenArrCategory: true });
  };

  toggleFalse = () => {
    this.setState({ isOpenArrCategory: false });
  };

  liHandlerCategoryTrue = (e) => {
    e.preventDefault();
    this.setState({
      isOpenModalLiCategory: true,
      selected: e.target.id,
    });
  };

  liHandlerCategoryFalse = () => {
    this.setState({
      isOpenModalLiCategory: false,
    });
  };

  // toggle for on click

  btnRef = createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
    this.fetchHomeProducts();
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    console.log(e);

    if (e.code !== "Escape") {
      return;
    }

    this.toggleFalse();
  };

  handleBackdropClick = (e) => {
    if (this.btnRef.current && e.target !== this.btnRef.current) {
      return;
    }

    this.toggleFalse();
  };

  fetchHomeProducts() {
    this.setState({ isLoading: true });
    try {
      return fetch("https://shop-integral.herokuapp.com/api/main")
        .then((res) => res.json())
        .then((data) => data.main)
        .then((arr) => {
          this.setState({
            arrMain: arr,
          });
        })
        .catch((error) => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { arrCategory, isOpenArrCategory, arrMain, isLoading } = this.state;

    return (
      <div className={stylish.wrapper}>
        <div className={stylish.container}>
          <div className={stylish.boxNavMenu}>
            <div className={stylish.btnList}>
              <button
                className={stylish.btnListCategory}
                onClick={this.toggleTrue}
                // onMouseEnter={this.toggleTrue}
              >
                Shop By Catalog
              </button>
              <div
                className={stylish.boxTest}
                ref={this.btnRef}
                onClick={this.handleBackdropClick}
                onMouseLeave={this.toggleFalse} // open
              >
                {isLoading && (
                  <div className={stylish.loadPosition}>
                    <Loader
                      type="BallTriangle"
                      color="rgb(117, 111, 228)"
                      height={80}
                      width={80}
                      // timeout={3000} //3 secs
                    />
                  </div>
                )}

                {/* <ul className={stylish.boxUlMain}> */}

                {arrMain &&
                  arrMain.map((elem) => (
                    <div
                      key={elem.productID}
                      className={stylish.nameProductMain}
                    >
                      <div className={stylish.fontProductMain}>{elem.name}</div>
                      <NavLink
                        className={stylish.NavLinkProd}
                        to={`${routes.PRODUCT}/${elem.productID}`}
                      >
                        <div>
                          <img
                            className={stylish.imgMain}
                            src={elem.small_image}
                            alt={elem.product_code}
                          />
                        </div>
                      </NavLink>
                      <div className={stylish.fontPayProductMain}>
                        {elem.retail_price_uah} грн.
                      </div>
                      <div className={stylish.fontProductMain}>
                        {elem.country}
                      </div>
                    </div>
                  ))}

                {isOpenArrCategory && (
                  <ul
                    className={stylish.ulList}
                    onClick={this.handleBackdropClick}
                  >
                    {arrCategory.map((el) => (
                      <li className={stylish.liList} key={el.id}>
                        <IntegralPageCategory
                          id={el.id}
                          elem={el}
                          liHandlerCategoryTrue={this.liHandlerCategoryTrue}
                          className={stylish.liNameCategory}
                        />
                        <div className={stylish.detector}></div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <input
              placeholder="введите значение"
              className={stylish.inputIntegral}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default IntegralPage;
