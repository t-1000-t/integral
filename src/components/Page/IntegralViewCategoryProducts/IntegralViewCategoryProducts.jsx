import React, { Component, createRef } from "react";

import Loader from "react-loader-spinner";
import ScrollButton from "../../services/ScrollButton/ScrollButton";
import ModalLiqPay from "../../Modals/ModalLiqPay/ModalLiqPay";
import FilterallViewProducts from "../FilterallViewProducts/FilterallViewProducts";
import fetchFilterProducts from "../../services/fetchFilterProducts";
import fetchVendorsList from "../../services/fetchVendorsList";
import fetchArrProductsFilter from "../../services/fetchArrProductsFilter";
import AllViewProducts from "../../Page/IntegralViewCategoryProducts/AllViewProducts/AllViewProducts";

import stylish from "./IntegralViewCategoryProducts.module.css";
// import SortProducts from "../SortProducts/SortProducts";

class IntegralViewNotebooks extends Component {
  _isMounted = false;

  state = {
    arrProducts: [],
    arrFilterAll: [],
    arrVendors: [],
    arrProductsFilter: [],
    textSearch: "",
    isLoading: false,
    isLoadingProducts: false,
    isLoadingBoxIcon: false,
    isOpenIconLoad: true,
    isOpenModalLiqPay: false,
    isOpenFilter: false,
    vendorID: 0,
    getStartNum: 0,
    count: 0,
    countDataFilter: 0,
    totalCount: null,
    totalCountProductsFilter: null,
    scrolled: 0,
    indicFullProd: 0,
    activeItem: "",
    currentPage: 0,
    gobacktwo: "",
  };

  progressRef = createRef();
  inputRef = createRef();

  move = 1;

  // ----------------------------- Start LifeCicle

  componentDidMount() {
    window.addEventListener("scroll", this.scrollProgress);
    this.fetchArrProducts();
    this.getVendors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      vendorID,
      activeItem,
      arrProducts,
      isOpenIconLoad,
      arrProductsFilter,
    } = this.state;

    if (this.state.indicFullProd >= this.state.count && isOpenIconLoad) {
      setTimeout(() => {
        this.setState({
          isOpenIconLoad: false,
        });
      }, 7000);
    }
    if (prevState.activeItem !== activeItem && activeItem === "price_low") {
      this.setState({
        arrProducts: this.newSortArrProducts(arrProducts, activeItem),
        arrProductsFilter: this.newSortArrProducts(
          arrProductsFilter,
          activeItem
        ),
      });
    }
    if (prevState.activeItem !== activeItem && activeItem === "price_high") {
      this.setState({
        arrProducts: this.newSortArrProducts(arrProducts, activeItem),
        arrProductsFilter: this.newSortArrProducts(
          arrProductsFilter,
          activeItem
        ),
      });
    }
    if (prevState.vendorID !== vendorID && vendorID !== 0) {
      this.fetchArrProductsFilter();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollProgress);
  }

  // ---------------------------------- Finish LifeCicle

  // ----------------------------- Start ALL Function

  scrollProgress = (e) => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = `${(scrollPx / winHeightPx) * 100}%`;

    this.setState({
      scrolled: scrolled,
    });
  };

  nextCategory = this.props.match.params.categorynum;

  setSearchCategory = () => {
    this.props.history.push({
      ...this.props.location,
      pathname: `/`,
    });
  };

  // setHistoryPush = () => {
  //   this.props.history.push(`/products/${this.nextCategory}`);
  // };

  updateElemStatus = (elemID) => {
    this.setState((state) => ({
      arrVendors: state.arrVendors.map((item) => {
        if (item.vendorID === elemID) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return { ...item, completed: false };
      }),
      vendorID: elemID,
      activeItem: "",
    }));
  };

  updateVendorid = () => {
    this.setState((state) => ({
      arrVendors: state.arrVendors.map((item) => {
        return { ...item, completed: false };
      }),
      vendorID: 0,
    }));
    this.fetchArrProductsFilter();
  };

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

  handleCounter = (name) =>
    name === "back" ? this.state.currentPage : this.state.currentPage;

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

  toggleOpenModalLigPay = () => {
    this.setState({
      isOpenModalLiqPay: !this.state.isOpenModalLiqPay,
    });
  };

  // ----------------------------- Finish ALL Function

  // ----------------------------- Start AnyONE Fetch

  getVendors = () => {
    fetchVendorsList.fetchVendors(this.nextCategory).then((data) => {
      this.setState({
        arrVendors: data.result.map((elem) => {
          return { ...elem, completed: false };
        }),
      });
    });
  };

  toggleOpenFilter = () => {
    fetchFilterProducts.fetchFilter(this.nextCategory).then((items) => {
      this.setState({
        arrFilterAll: items.result,
      });
    });

    this.setState({
      isOpenFilter: !this.state.isOpenFilter,
    });
  };

  fetchProducrs(val) {
    // console.log("fetch todo started...");
    return fetch(
      // `http://localhost:5000/api/products/${this.nextCategory}/${val}`
      `https://shop-integral.herokuapp.com/api/products/${this.nextCategory}/${val}`
    ).then((res) => res.json());
  }

  // ----- !!!! ---- //

  async fetchArrProductsFilter() {
    this.setState({ isLoadingProducts: true });
    const note = {
      category: this.nextCategory,
      vendor: this.state.vendorID,
    };

    try {
      await fetchArrProductsFilter
        .fetchFilter(note)
        .then((data) => {
          this.setState({
            countDataFilter: data.count,
          });
          if (data.count > 1000) {
            this.setState({ isLoadingBoxIcon: true });
            const nIteration = Math.round(data.count / 1000);

            for (let i = 0; nIteration >= i; i++) {
              this.fetchProducrs(i * 1000).then((data) => {
                this.setState((state) => ({
                  arrProductsFilter: [
                    ...state.arrProductsFilter,
                    ...data.newArr,
                  ],
                }));
              });
              this.setState({
                indicFullProd: i * 1000,
              });
            }
            return;
          }
          this.setState({
            arrProductsFilter: data.newArr,
            totalCountProductsFilter: data.newArr.length,
          });
        })
        .catch((error) => {
          this.setState({
            error,
          });
        })
        .finally(() => {
          this.setState({ isLoadingProducts: false });
        });
    } catch (err) {
      console.error(err);
    }
  }

  // ----------------------------------------------- //

  async fetchArrProducts() {
    const { getStartNum } = this.state;

    this.setState({ isLoading: true });
    try {
      await this.fetchProducrs(getStartNum)
        .then((data) => {
          this.setState({
            count: data.count,
          });
          if (data.count > 1000) {
            this.setState({ isLoading: true, isLoadingBoxIcon: true });
            const nIteration = Math.round(data.count / 1000);

            for (let i = 0; nIteration >= i; i++) {
              this.fetchProducrs(i * 1000).then((data) => {
                this.setState((state) => ({
                  arrProducts: [...state.arrProducts, ...data.newArr],
                  totalCount: state.totalCount + data.newArr.length,
                }));
              });
              this.setState({
                indicFullProd: i * 1000,
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

  // ----------------------------- Finish AnyONE Fetch

  render() {
    const {
      isLoading,
      isLoadingProducts,
      isOpenIconLoad,
      isOpenModalLiqPay,
      arrProducts,
      // arrFilterAll,
      arrVendors,
      arrProductsFilter,
      textSearch,
      totalCount,
      scrolled,
      currentPage,
      isOpenFilter,
      vendorID,
    } = this.state;

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

    return (
      <>
        <div className={stylish.wrapperPage}>
          <div>
            <ScrollButton />
          </div>
          <div className={stylish.wrapperTitle}>
            <div className={stylish.boxTitle}>
              <div className={stylish.title}>Продукты категории</div>
              <button
                className={stylish.btnFilter}
                onClick={this.toggleOpenFilter}
              >
                Filter
              </button>
              <input
                className={stylish.inputSearch}
                type="text"
                placeholder="я ищу.."
                value={textSearch}
                title="ввод крилицей или латиницей"
                onChange={this.heandlerSearch}
              />

              <div style={progressBoxStyle}>
                <div className={stylish.tCountNum}>
                  <div className={stylish.numbers}>{totalCount}</div>

                  <>
                    {isOpenIconLoad ? (
                      <div className={stylish.iconSeconds}></div>
                    ) : (
                      <div></div>
                    )}
                  </>
                </div>
              </div>
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
            {newArrProducts.length > 0 && (
              <div className={stylish.containerLeft}>
                {isOpenFilter && (
                  <div className={stylish.filterBody}>
                    <ul>
                      {arrVendors.length > 0 &&
                        arrVendors.map((elem) => (
                          <li
                            key={elem.vendorID}
                            className={stylish.liCheckbox}
                          >
                            <p className={stylish.checkboxName}>{elem.name}</p>
                            <input
                              ref={this.inputRef}
                              type="checkbox"
                              className={stylish.checkbox}
                              checked={elem.completed}
                              onChange={() =>
                                this.updateElemStatus(elem.vendorID)
                              }
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                <div className={stylish.btnBox}>
                  <button
                    className={stylish.btnBack}
                    onClick={this.setSearchCategory}
                  >
                    Back
                  </button>
                  <button
                    className={stylish.btnAll}
                    onClick={this.updateVendorid}
                  >
                    All
                  </button>
                </div>
              </div>
            )}

            {isLoadingProducts ? (
              <div className={stylish.containerMiddle}>
                <div className={stylish.loadingFilterProducts}>
                  <Loader
                    type="Circles"
                    color="rgb(117, 111, 228)"
                    height={80}
                    width={80}
                    // timeout={3000} //3 secs
                  />
                </div>
              </div>
            ) : (
              <div className={stylish.containerMiddle}>
                {vendorID !== 0 ? (
                  <FilterallViewProducts
                    arrProductsFilter={arrProductsFilter}
                    vendorID={vendorID}
                  />
                ) : (
                  <AllViewProducts
                    categoryNum={this.nextCategory}
                    newArrProducts={newArrProducts}
                    currentPage={currentPage}
                    backCount={this.backCount}
                    nextCount={this.nextCount}
                  />
                )}
              </div>
            )}

            {newArrProducts.length > 0 && (
              <div className={stylish.containerRight}>
                <div className={stylish.someOneContent}>
                  Тут может быть ваша реклама
                </div>
              </div>
            )}
          </div>

          {isOpenModalLiqPay && (
            <ModalLiqPay onClose={this.toggleOpenModalLigPay}>
              1111111122323
            </ModalLiqPay>
          )}
        </div>
      </>
    );
  }
}

export default IntegralViewNotebooks;
