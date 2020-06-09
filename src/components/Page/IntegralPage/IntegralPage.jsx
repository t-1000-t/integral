import React, { Component, createRef } from "react";
import routes from "../../../routes/routes";
import { NavLink } from "react-router-dom";
import IntegralPageCategory from "../IntegralPageCategory/IntegralPageCategory";
import Loader from "react-loader-spinner";
import ModalPicturesPage from "../../Modals/ModalPicturesPage/ModalPicturesPage";
import shortid from "shortid";

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
        name6: "Манипуляторы",
        category6: "1547",
        name7: "Кресло игровое",
        category7: "8230",
        name8: "Кресла",
        category8: "7453",
        name9: "",
        category9: "",
        name10: "",
        category10: "",
      },
      {
        id: "004",
        name1: "Комплектующие для ПК",
        category1: "1330",
        name2: "Комплектующие к Ноутбукам",
        category2: "1233",
        name3: "Манипуляторы",
        category3: "1547",
        name4: "Кресло игровое",
        category4: "8230",
        name5: "",
        category5: "",
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
        id: "005",
        name1: "Смартфоны, связь, навигация",
        category1: "1266",
        name2: "Ремешки к смарт часам и браслетам",
        category2: "8520",
        name3: "Смарт-Чехол от солнца",
        category3: "8375",
        name4: "",
        category4: "",
        name5: "",
        category5: "",
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
        id: "006",
        name1: "Принтеры",
        category1: "7820",
        name2: "3D-Принтер",
        category2: "8220",
        name3: "Струйный принтер",
        category3: "1193",
        name4: "Лазерный принтер",
        category4: "8170",
        name5: "Матричный принтер",
        category5: "8171",
        name6: "Мобильный Фотопринтер",
        category6: "8228",
        name7: "Аксесуары к принтерам",
        category7: "7902",
        name8: "Кабели для принтера",
        category8: "7903",
        name9: "Принтер этикеток",
        category9: "7939",
        name10: "Принтер чеков",
        category10: "7938",
        name11: "Принтер пластиковых карт",
        category11: "7937",
      },
      {
        id: "007",
        name1: "Сетевое оборудование",
        category1: "1392",
        name2: "Активное сетевое оборудование",
        category2: "1561",
        name3: "Пассивное сетевое оборудование",
        category3: "1564",
        name4: "",
        category4: "",
        name5: "",
        category5: "",
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
        name11: "",
        category11: "",
      },
      {
        id: "008",
        name1: "Телевизоры и проекторы",
        category1: "1098",
        name2: "Аксессуары к телевизорам",
        category2: "7815",
        name3: "Аксессуары к телевизорам и другое",
        category3: "1099",
        name4: "Кабель телевизионный",
        category4: "8407",
        name5: "Гаджеты (HI-TECH)",
        category5: "8162",
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
        name11: "",
        category11: "",
      },
      {
        id: "009",
        name1: "Наушники и гарнитуры",
        category1: "1365",
        name2: "Аксессуары к телевизорам и другое",
        category2: "1099",
        name3: "",
        category3: "",
        name4: "",
        category4: "",
        name5: "",
        category5: "",
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
        name11: "",
        category11: "",
      },
      {
        id: "010",
        name1: "Бытовая техника",
        category1: "7302",
        name2: "Мелкая бытовая техника",
        category2: "7275",
        name3: "Крупная бытовая техника",
        category3: "7442",
        name4: "",
        category4: "",
        name5: "",
        category5: "",
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
        name11: "",
        category11: "",
      },
    ],
    isOpenArrCategory: false,
    isOpenNameCategory: null,
    isLoading: false,
    arrMain: [],
    pageNum: 1,
    inputValue: "",
    patternValue: "",
    setCategory: "",
    isOpenChange: false,
    isOpenBanner: false,
    isOpenBanner2eUa: false,
  };

  toggleTrue = () => {
    this.setState({ isOpenArrCategory: true });
  };

  toggleFalse = () => {
    this.setState({ isOpenArrCategory: false });
  };

  toggleChange = () => {
    this.setState({ isOpenArrCategory: !this.state.isOpenArrCategory });
  };

  toggleBanner = () => {
    this.setState({
      isOpenBanner: !this.state.isOpenBanner,
    });
  };

  toggleBanner2eUa = () => {
    this.setState({
      isOpenBanner2eUa: !this.state.isOpenBanner2eUa,
    });
  };

  changeBanner = () => {
    setInterval(() => {
      this.setState({
        isOpenChange: !this.state.isOpenChange,
      });
    }, 2500);
  };

  liHandlerCategoryTrue = () => {
    this.setState({
      isOpenModalLiCategory: true,
    });
  };

  liHandlerCategoryFalse = () => {
    this.setState({
      isOpenModalLiCategory: false,
    });
  };

  inputIds = {
    nameInputId: shortid.generate(),
  };

  // toggle for on click
  inputRef = createRef();
  btnRef = createRef();
  btnRouteRef = createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
    this.fetchHomeProducts();
    this.changeBanner();
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
      return fetch(
        // `http://localhost:5000/api/main`
        `https://shop-integral.herokuapp.com/api/main`
      )
        .then((res) => res.json())
        .then((data) => data.main)
        .then((arr) => {
          this.setState((state) => ({
            arrMain: [...state.arrMain, ...arr],
            pageNum: state.pageNum + 1,
          }));
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

  heandleChange = (e) => {
    this.setState({
      inputValue: e.currentTarget.value,
      patternValue: "[A-Z][0-9]{7}",
    });
  };

  heandleBack = () => {
    this.setState({
      goback: { from: this.props.location },
    });
  };

  render() {
    const {
      arrCategory,
      isOpenArrCategory,
      arrMain,
      isLoading,
      inputValue,
      patternValue,
      isOpenChange,
      isOpenBanner,
      isOpenBanner2eUa,
    } = this.state;

    // inputValue.replace();

    return (
      <div className={stylish.wrapper}>
        <div className={stylish.container}>
          <div className={stylish.boxNavMenu}>
            <div className={stylish.btnList}>
              <button
                className={stylish.btnListCategory}
                onClick={this.toggleChange}
                // onMouseEnter={this.toggleTrue}
              >
                Каталог Товаров
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

                {arrMain === null
                  ? this.fetchHomeProducts()
                  : arrMain.map((elem) =>
                      elem.productID === null ? (
                        this.fetchHomeProducts()
                      ) : (
                        <div
                          key={elem.productID}
                          className={stylish.nameProductMain}
                        >
                          <div className={stylish.fontProductMain}>
                            {elem.name}
                          </div>
                          <div className={stylish.fontProductMain}>
                            Код: {elem.product_code}
                          </div>
                          <NavLink
                            className={stylish.NavLinkProd}
                            to={`${routes.PRODUCT}/${elem.productID}`}
                          >
                            <div className={stylish.imgBox}>
                              <img
                                className={stylish.imgMain}
                                src={elem.small_image}
                                alt={elem.product_code}
                              />
                            </div>
                          </NavLink>
                          <div className={stylish.fontPayProductMain}>
                            {/* {elem.retail_price_uah} грн. */}
                          </div>
                          <div className={stylish.fontProductMain}>
                            {elem.country}
                          </div>
                        </div>
                      )
                    )}

                {isOpenArrCategory && (
                  <ul
                    className={stylish.ulList}
                    // onClick={this.handleBackdropClick}
                  >
                    {arrCategory.map((el) => (
                      <li
                        className={stylish.liList}
                        key={el.id}
                        id={el.id}
                        onClick={this.heandleBack}
                      >
                        <IntegralPageCategory
                          id={el.id}
                          elem={el}
                          liHandlerCategoryTrue={this.liHandlerCategoryTrue}
                          className={stylish.liNameCategory}
                          onClick={this.handleBackdropClick}
                        />
                        <div className={stylish.detector}></div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <form>
              <label htmlFor={this.inputIds.nameInputId}>
                <div className={stylish.searchInput}>
                  <input
                    ref={this.inputRef}
                    id={this.inputIds.nameInputId}
                    placeholder="КОД продутка..."
                    title="Используйте формат ввода: A1234567"
                    type="text"
                    // pattern="[A-Z][0-9]{7}"
                    pattern={patternValue}
                    className={stylish.inputIntegral}
                    value={inputValue}
                    onChange={this.heandleChange}
                  />

                  <NavLink
                    className={stylish.NavLinkProd}
                    to={`${routes.PRODUCT_CODE}/${inputValue}`}
                  >
                    <button
                      className={stylish.btnSearch}
                      disabled={this.state.inputValue.trim().length === 0}
                    >
                      поиск
                    </button>
                  </NavLink>
                </div>
              </label>
            </form>
          </div>
        </div>

        <div className={stylish.boxImgBanner} onClick={this.toggleBanner}>
          <div
            className={isOpenChange ? stylish.banner : stylish.bannerUa}
          ></div>
        </div>
        <div className={stylish.boxImgBanner} onClick={this.toggleBanner2eUa}>
          <div className={stylish.banner2eUa}></div>
        </div>
        {isOpenBanner && (
          <ModalPicturesPage onClose={this.toggleBanner}>
            <div className={stylish.bannerModal}></div>
          </ModalPicturesPage>
        )}
        {isOpenBanner2eUa && (
          <ModalPicturesPage onClose={this.toggleBanner2eUa}>
            <div className={stylish.bannerModal2eUa}></div>
          </ModalPicturesPage>
        )}
      </div>
    );
  }
}

export default IntegralPage;
