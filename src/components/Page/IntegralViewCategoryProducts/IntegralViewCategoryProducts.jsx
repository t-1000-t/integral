import React, { Component, createRef } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../../routes/routes";
import Loader from "react-loader-spinner";
import ScrollButton from "../../services/ScrollButton/ScrollButton";

import stylish from "./IntegralViewCategoryProducts.module.css";
// import SortProducts from "../SortProducts/SortProducts";

class IntegralViewNotebooks extends Component {
  _isMounted = false;

  state = {
    arrProducts: [],
    textSearch: "",
    isLoading: false,
    isOpenIconLoad: false,
    getStartNum: 0,
    count: 0,
    totalCount: null,
    scrolled: 0,
    indicatorLoadProducts: 0,
    activeItem: "",
    testArray: [],
    currentPage: 0,
  };

  progressRef = createRef();

  move = 1;

  componentDidMount() {
    window.addEventListener("scroll", this.scrollProgress);
    this.fetchArrProducts();
    // const { props } = this.props.location;
    // if (!props) this.saveHistory(this.move);

    // const item = new URLSearchParams(this.props.location.props).get("item");
    // if (item < this.move || item > this.state.arrProducts.length) {
    //   this.saveHistory(this.move);
    //   return;
    // }
    // this.setState({ currentPage: Number(item) });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollProgress);
  }

  scrollProgress = (e) => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = `${(scrollPx / winHeightPx) * 100}%`;

    // console.log(scrolled);

    this.setState({
      scrolled: scrolled,
    });
  };

  loadProgress = () => {
    const { count, totalCount } = this.state;
    const loadPx = count;
    const wLoadPx = loadPx - totalCount;
    const fullLoad = `${(loadPx / wLoadPx) * 100}%`;

    console.log(fullLoad);

    this.setState({
      indicatorLoadProducts: fullLoad,
    });
  };

  // progress = document.getElementById("progressID");

  nextCategory = this.props.match.params.categorynum;

  setSearchCategory = () => {
    this.props.history.push({
      ...this.props,
    });
  };

  fetchProducrs(val) {
    // console.log("fetch todo started...");
    return fetch(
      // `http://localhost:5000/api/products/${this.nextCategory}/${val}`
      `https://shop-integral.herokuapp.com/api/products/${this.nextCategory}/${val}`
    ).then((res) => res.json());
  }

  async fetchArrProducts() {
    const { getStartNum } = this.state;
    // console.log(this.nextCategory);
    this.setState({ isLoading: true });
    try {
      await this.fetchProducrs(getStartNum)
        .then((data) => {
          // console.log("data", data);
          this.setState({
            count: data.count,
          });
          if (data.count > 1000) {
            this.setState({ isLoading: true });
            const nIteration = Math.round(data.count / 1000);
            // console.log(nIteration);
            for (let i = 0; nIteration >= i; i++) {
              // console.log("i", i);
              this.fetchProducrs(i * 1000).then((data) => {
                this.setState((state) => ({
                  arrProducts: [...state.arrProducts, ...data.newArr],
                  totalCount: state.totalCount + data.newArr.length,
                }));
              });
            }
            return;
          }
          this.setState({
            arrProducts: data.newArr,
            totalCount: data.newArr.length,
          });

          console.log("data.count 1", data.result.count);
          console.log("totalCount 1", this.state.totalCount);
        })
        .catch((error) => {
          this.setState({
            error,
          });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } catch (err) {
      console.error(err);
    }
  }

  heandlerSearch = (e) => {
    this.setState({ textSearch: e.currentTarget.value });
  };

  handleItemClick = (e) => {
    this.setState({
      activeItem: e.currentTarget.name,
    });
  };

  sortByDateLow = (arr) => {
    return arr.sort(function (a, b) {
      return a.retail_price_uah - b.retail_price_uah;
    });
  };

  sortByDateHigh = (arr) => {
    return arr.sort(function (a, b) {
      return b.retail_price_uah - a.retail_price_uah;
    });
  };

  newSortArrProducts = (array, activeItem) => {
    switch (activeItem) {
      case "price_low":
        return this.sortByDateLow(array);
      case "price_high":
        return this.sortByDateHigh(array);
      default:
    }
  };

  chunk(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }

  saveHistory = (item) => console.log("ok");
  // this.props.history.push({ ...this.props.location, props: `${item}` });

  handleCounter = (name) =>
    name === "back"
      ? this.saveHistory(this.state.currentPage)
      : this.saveHistory(this.state.currentPage);

  nextCount = ({ target: { name } }) => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
    this.handleCounter(name);
  };

  backCount = ({ target: { name } }) => {
    this.setState({
      currentPage: this.state.currentPage - 1,
    });
    this.handleCounter(name);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { activeItem, arrProducts, indicatorLoadProducts } = this.state;
    const { location } = this.props;
    if (prevState.indicatorLoadProducts !== indicatorLoadProducts) {
      this.loadProgress();
    }
    if (prevState.activeItem !== activeItem && activeItem === "price_low") {
      this.setState({
        arrProducts: this.newSortArrProducts(arrProducts, activeItem),
      });
    }
    if (prevState.activeItem !== activeItem && activeItem === "price_high") {
      this.setState({
        arrProducts: this.newSortArrProducts(arrProducts, activeItem),
      });
    }
    if (location.props === prevProps.location.props) return;
    const item = new URLSearchParams(location.props).get("item");
    this.setState({ currentPage: Number(item) });
  }

  render() {
    const {
      isLoading,
      isOpenIconLoad,
      arrProducts,
      textSearch,
      totalCount,
      scrolled,
      testArray,
      currentPage,
      indicatorLoadProducts,
    } = this.state;

    console.log("testArray", testArray);
    console.log("arrProducts", arrProducts);

    const progressContainerStyle = {
      background: "#e8e8fd",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      height: "8px",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      zIndex: 99,
    };

    const progressBarStyle = {
      height: "8px",
      background: "#fed700",
      width: scrolled,
    };

    const progressBoxStyle = {
      background: "#e8e8fd",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      height: "25px",
      width: "110px",
      borderRadius: "8px",
      marginLeft: "20px",
      zIndex: 99,
    };

    const newArrProducts = this.chunk(
      arrProducts.filter(
        (elem) =>
          elem.name.toLowerCase().includes(textSearch.toLowerCase()) ||
          elem.product_code.toLowerCase().includes(textSearch.toLowerCase()) ||
          elem.articul.toLowerCase().includes(textSearch.toLowerCase())
      ),
      20
    );
    console.log("newArrProducts", newArrProducts.length);

    return (
      <>
        <div className={stylish.wrapperPage}>
          <div>
            <ScrollButton />
          </div>
          <div className={stylish.wrapperTitle}>
            <div className={stylish.boxTitle}>
              <div className={stylish.title}>Продукты категории</div>
              <input
                className={stylish.inputSearch}
                type="text"
                placeholder="я ищу.."
                value={textSearch}
                title="ввод крилицей или латиницей"
                onChange={this.heandlerSearch}
              />
              {/* {totalCount && ( */}
              <div style={progressBoxStyle}>
                <div className={stylish.tCountNum}>
                  <div className={stylish.numbers}>{totalCount}</div>
                  {isOpenIconLoad ? (
                    <div>Load...</div>
                  ) : (
                    <div className={stylish.iconSeconds}></div>
                  )}
                </div>
              </div>
              {/* )} */}
              <div>
                <ul className={stylish.boxSortBtn}>
                  <li className={stylish.liName}>
                    <button
                      name="price_low"
                      className={stylish.liBtn}
                      onClick={this.handleItemClick}
                    >
                      От дешовых
                    </button>
                  </li>
                  <li className={stylish.liName}>
                    <button
                      name="price_high"
                      className={stylish.liBtn}
                      onClick={this.handleItemClick}
                    >
                      От дорогих
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div style={progressContainerStyle}>
              <div style={progressBarStyle}></div>
            </div>
          </div>
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
          <div id="idCategProdScroll" className={stylish.container}>
            <ul className={stylish.wrapper}>
              {newArrProducts.length > 0 &&
                newArrProducts[currentPage].map((item) =>
                  item.stocks.length > 0 ? (
                    <li key={item.productID}>
                      <div className={stylish.card}>
                        <div>
                          <div className={stylish.nameItem}>{item.name}</div>
                          <div className={stylish.fontProdCode}>
                            Код Товара: {item.product_code}
                          </div>
                          <NavLink
                            className={stylish.NavLinkProd}
                            to={`${routes.PRODUCT}/${item.productID}`}
                          >
                            <div>
                              <img src={item.medium_image} alt={item.articul} />
                            </div>
                          </NavLink>
                          <div className={stylish.priceInfo}>
                            <div className={stylish.fontPriceRetail}>
                              {item.retail_price_uah} грн.
                            </div>
                            <div className={stylish.fontCountry}>
                              {item.country}
                            </div>
                          </div>
                          <button className={stylish.btnCard}>Купить</button>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li key={item.productID}>
                      <div className={stylish.card}>
                        <div>
                          <div className={stylish.nameItem}>{item.name}</div>
                          <div className={stylish.fontProdCode}>
                            Код Товара: {item.product_code}
                          </div>
                          <NavLink
                            className={stylish.NavLinkProd}
                            to={`${routes.PRODUCT}/${item.productID}`}
                          >
                            <div className={stylish.noPresentProduct}>
                              <img src={item.medium_image} alt={item.articul} />
                            </div>
                          </NavLink>
                          <div className={stylish.priceInfo}>
                            <div className={stylish.fontPriceRetailNoProduct}>
                              {item.retail_price_uah} грн.
                            </div>
                            <div className={stylish.fontCountry}>
                              {item.country}
                            </div>
                          </div>
                          {/* <button className={stylish.btnCard}>Купить</button> */}
                        </div>
                      </div>
                    </li>
                  )
                )}
              <div className={stylish.btnWrap}>
                {newArrProducts.length > 0 && (
                  <>
                    <button
                      name="back"
                      className={stylish.btnMore}
                      type="button"
                      onClick={this.backCount}
                      disabled={currentPage === 0}
                    >
                      Back
                    </button>

                    <button
                      name="next"
                      className={stylish.btnMore}
                      type="button"
                      onClick={this.nextCount}
                      disabled={
                        currentPage === Number(newArrProducts.length) - 1
                      }
                    >
                      Next
                    </button>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default IntegralViewNotebooks;
