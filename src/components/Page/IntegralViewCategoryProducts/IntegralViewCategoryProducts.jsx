import React, { Component, createRef } from "react";

import Loader from "react-loader-spinner";
import ScrollButton from "../../services/ScrollButton/ScrollButton";
import ModalLiqPay from "../../Modals/ModalLiqPay/ModalLiqPay";
import FilterallViewProducts from "../FilterallViewProducts/FilterallViewProducts";
import fetchFilterProducts from "../../services/fetchFilterProducts";
// import fetchAllCategoryes from "../../services/fetchAllCategoryes";
// import fetchVendorsList from "../../services/fetchVendorsList";
import fetchArrProductsFilter from "../../services/fetchArrProductsFilter";
import fetchArrParamsFilter from "../../services/fetchArrParamsFilter";
import AllViewProducts from "../../Page/IntegralViewCategoryProducts/AllViewProducts/AllViewProducts";
import FilterCategoryName from "./filterCategoryName/FilterCategoryName";
import routes from "../../../routes/routes";
import shortid from "shortid";

import stylish from "./IntegralViewCategoryProducts.module.css";
// import SortProducts from "../SortProducts/SortProducts";

class IntegralViewNotebooks extends Component {
  _isMounted = false;

  state = {
    arrProducts: [],
    arrFilterAll: [],
    arrVendors: [],
    arrProductsFilter: [],
    arrCheckFilters: [],
    textSearch: "",
    isLoading: false,
    isLoadingProducts: false,
    isLoadingBoxIcon: false,
    isLoadingMoreProducts: false,
    isOpenIconLoad: true,
    isOpenModalLiqPay: false,
    isOpenFilter: false,
    isOpenFilterElem: false,
    vendorID: 0,
    filterID: "",
    getStartNum: 0,
    count: 0,
    pagesCount: [],
    countDataFilter: 0,
    countArrVendors: 0,
    totalCount: null,
    totalCountProductsFilter: null,
    scrolled: 0,
    indicFullProd: 0,
    activeItem: "",
    currentPage: 0,
    gobacktwo: "",
  };

  progressRef = createRef();

  move = 1;

  // ----------------------------- Start LifeCicle

  componentDidMount() {
    // console.log("categoryNumber", this.categoryNumber);
    window.addEventListener("scroll", this.scrollProgress);
    this.fetchArrProducts();
    this.getFiltersAll();
    this.getPages();
    // this.fetchCat();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      filterID,
      isOpenIconLoad,
      count,
      arrFilterAll,
      arrCheckFilters,
      arrProductsFilter,
      arrProducts,
      currentPage,
      isOpenFilter,
      activeItem,
    } = this.state;

    if (this.state.indicFullProd >= this.state.count && isOpenIconLoad) {
      setTimeout(() => {
        this.setState({
          isOpenIconLoad: false,
        });
      }, 7000);
    }

    if (
      prevState.arrProductsFilter !== arrProductsFilter &&
      arrProductsFilter.length > 0
    ) {
      this.setScrollUp();
    }

    if (prevState.arrFilterAll !== arrFilterAll) {
      this.setArrFilters();
    }

    if (prevState.isOpenFilter !== isOpenFilter && arrFilterAll.length === 0) {
      this.setState({
        isOpenFilter: false,
      });
    }

    if (prevState.isOpenFilter !== isOpenFilter && isOpenFilter === false) {
      this.setState({
        filterID: "",
      });
    }

    if (prevState.arrCheckFilters !== arrCheckFilters) {
      this.setSearchFilter();
      this.setMatchParams();
    }

    if (prevState.count !== count) {
      this.getPages();
    }

    if (prevState.currentPage !== currentPage) {
      this.fetchPaginationProducts();
    }

    if (prevState.filterID !== filterID && filterID !== "") {
      this.setSearchFilter();
      // this.getArrProductsFilter();
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

    if (prevProps.location.params !== this.props.location.params) {
      this.getChecksProducts();
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

  categoryNumber = this.props.match.params.categorynum;

  setSearchCategory = () => {
    this.props.history.push({
      ...this.props.location,
      pathname: `/`,
    });
  };

  setMatchParams = () => {
    const { arrCheckFilters } = this.state;

    const matchParams = arrCheckFilters.reduce((sum, item) => {
      return sum + `&filters[]=${item}`;
    }, "");

    this.props.history.push({
      ...this.props.match,
      params: {
        filterone: matchParams,
      },
    });
  };

  setSearchFilter = () => {
    const { arrCheckFilters } = this.state;
    // console.log("arrCheckFilters", arrCheckFilters);

    const linkFiltersParams = arrCheckFilters.reduce((sum, item) => {
      return sum + `${item}/`;
    }, "");

    console.log("linkFiltersParams", linkFiltersParams);

    this.props.history.push({
      ...this.props.location,
      pathname: `${routes.PRODUCTS}/${this.categoryNumber}/${linkFiltersParams}`,
    });
  };

  setArrFilters = () => {
    const { arrFilterAll } = this.state;
    arrFilterAll.map((el) =>
      el.filters.map((it) => {
        if (it.completed === true) {
          this.setState((state) => ({
            arrCheckFilters: [...state.arrCheckFilters, it.filterID],
          }));
        }
        return it;
      })
    );
  };

  updateElemStatus = (itemID) => {
    this.setState((state) => ({
      arrFilterAll: state.arrFilterAll.map((elem) => {
        return {
          ...elem,
          filters: elem.filters.map((el) => {
            if (el.filterID === itemID) {
              return { ...el, completed: !el.completed };
            }
            return el;
          }),
        };
      }),
      filterID: itemID,
      arrCheckFilters: [],
      arrProductsFilter: [],
    }));

    this.setSearchFilter();
  };

  updateFilterAll = () => {
    this.setState((state) => ({
      arrFilterAll: state.arrFilterAll.map((elem) => {
        return {
          ...elem,
          filters: elem.filters.map((el) => {
            return { ...el, completed: false };
          }),
        };
      }),
    }));
    this.props.history.push({
      ...this.props.location,
      pathname: `${routes.PRODUCTS}/${this.categoryNumber}`,
    });
    this.getArrProductsFilter();
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

  countMore = () => {
    this.setState({
      isLoadingMoreProducts: true,
      currentPage: this.state.currentPage + 1000,
    });
  };

  toggleOpenModalLigPay = () => {
    this.setState({
      isOpenModalLiqPay: !this.state.isOpenModalLiqPay,
    });
  };

  setCurrentPage = (p) => {
    this.setState({
      activeItem: "",
      currentPage: p,
    });
  };

  getPages = () => {
    const { count, currentPage } = this.state;
    const pageCount = Math.floor(count / (currentPage + 1000));

    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      pages.push(i + 1);
    }

    this.setState({
      pagesCount: [...pages],
    });
  };

  setScrollUp = () => {
    setTimeout(() => {
      window.scroll(0, 0);
    }, 0);
  };

  toggleOpenFilter = () => {
    this.setState({
      isOpenFilter: !this.state.isOpenFilter,
    });
  };

  // ----------------------------- Finish ALL Function

  // ------------------------------- START fetch POST

  // fetchAllCategoryes()

  // postAllCategoryes = (arr) => {
  //   fetch("https://allcat-cfe71.firebaseio.com/all.json", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify([arr]),
  //   });
  // };

  // fetchCat = async () => {
  //   fetchAllCategoryes.fetchCategoryes().then((data) => {
  //     this.postAllCategoryes(data);
  //   });
  // };

  // ------------------------------- FINISH fetch POST

  // ----------------------------- Start AnyONE Fetch

  getFiltersAll = () => {
    fetchFilterProducts.fetchFilter(this.categoryNumber).then((data) => {
      this.setState({
        arrFilterAll: data.result.map((elem) => {
          return {
            ...elem,
            // completed: false,
            filters: elem.filters.map((el) => {
              return { ...el, completed: false };
            }),
          };
        }),
      });
    });
  };

  fetchProducrs(pagenum) {
    return fetch(
      // `http://localhost:5000/api/products/${this.categoryNumber}/${pagenum}`
      `https://shop-integral.herokuapp.com/api/products/${this.categoryNumber}/${pagenum}`
    ).then((res) => res.json());
  }

  // ----------!!!!!-----------//

  async getChecksProducts() {
    this.setState({ isLoadingProducts: true });
    const note = {
      category: this.categoryNumber,
      filters: this.props.location.params.filterone,
    };

    try {
      await fetchArrParamsFilter
        .fetchFilterParam(note)
        .then((data) => {
          if (!data.newArr) {
            return;
          }
          this.setState((state) => ({
            countDataFilter: data.count,
            arrProductsFilter: [...state.arrProductsFilter, ...data.newArr],
            totalCountProductsFilter: data.newArr.length,
          }));
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

  // ----- !!!! ---- //

  async getArrProductsFilter() {
    this.setState({ isLoadingProducts: true });
    const note = {
      category: this.categoryNumber,
      // filter1: this.props.location.params.filterone,
    };

    try {
      await fetchArrProductsFilter
        .fetchFilter(note)
        .then((data) => {
          this.setState({
            countDataFilter: data.count,
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
    const { currentPage } = this.state;
    this.setState({ isLoading: true });
    try {
      await this.fetchProducrs(currentPage)
        .then((data) => {
          this.setState((state) => ({
            count: data.count,
            arrProducts: [...state.arrProducts, ...data.newArr],
          }));
        })
        .catch((error) => {
          this.setState({
            error,
          });
        })
        .finally(() => {
          this.setState({ isLoading: false, isLoadingMoreProducts: false });
        });
    } catch (err) {
      console.error(err);
    }
  }

  // ----------------------------------------------- Fetch Pagination Products  //

  async fetchPaginationProducts() {
    const { currentPage } = this.state;
    console.log("currentPage", currentPage);
    let num = currentPage * 1000;
    this.setState({ isLoading: true });
    try {
      await this.fetchProducrs(num)
        .then((data) => {
          this.setState({
            arrProducts: data.newArr,
          });
        })
        .catch((error) => {
          this.setState({
            error,
          });
        })
        .finally(() => {
          this.setState({ isLoading: false, isLoadingMoreProducts: false });
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

      isLoadingMoreProducts,
      isOpenModalLiqPay,
      arrProducts,
      count,
      arrFilterAll,
      pagesCount,
      arrProductsFilter,
      textSearch,

      scrolled,
      currentPage,
      isOpenFilter,
      filterID,
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

    // const progressBoxStyle = {
    //   background: "#e8e8fd",
    //   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    //   height: "25px",
    //   width: "110px",
    //   borderRadius: "8px",
    //   marginLeft: "20px",
    //   zIndex: 99,
    // };

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
                Фильтр
              </button>
              <input
                className={stylish.inputSearch}
                type="text"
                placeholder="я ищу.."
                value={textSearch}
                title="ввод крилицей или латиницей"
                onChange={this.heandlerSearch}
              />

              {/* {isOpenFilter && ( */}
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
              {/* )} */}
            </div>
            <div style={progressContainerStyle}>
              <div style={progressBarStyle}></div>
            </div>
          </div>

          {arrProducts.length > 0 && (
            <div className={stylish.wrapperPagination}>
              <div className={stylish.containerPagination}>
                {!isOpenFilter && (
                  <>
                    {pagesCount.map((p) => {
                      return (
                        <div
                          className={
                            currentPage === p
                              ? stylish.listPaginationActive
                              : stylish.listPagination
                          }
                          key={shortid.generate()}
                          onClick={() => {
                            this.setCurrentPage(p);
                          }}
                        >
                          <span
                            key={shortid.generate()}
                            className={
                              currentPage === p
                                ? stylish.selected
                                : stylish.selectedbold
                            }
                          >
                            {p}
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          )}

          <div id="idCategProdScroll" className={stylish.container}>
            {arrProducts.length > 0 && (
              <div className={stylish.containerLeft}>
                {isOpenFilter && (
                  <div className={stylish.filterWrapper}>
                    <ul className={stylish.filterBody}>
                      {arrFilterAll.length > 0 &&
                        arrFilterAll.map((elem) => (
                          <li
                            key={elem.optionID}
                            className={stylish.liCheckbox}
                          >
                            <FilterCategoryName
                              elem={elem}
                              updateElemStatus={this.updateElemStatus}
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
                    Назад
                  </button>
                  <button
                    className={stylish.btnAll}
                    onClick={this.updateFilterAll}
                  >
                    Сброс
                  </button>
                </div>
              </div>
            )}
            <div className={stylish.boxContainerMiddle}>
              {isLoading && (
                <div className={stylish.loadPosition}>
                  <Loader
                    type="ThreeDots"
                    color="rgb(117, 111, 228)"
                    height={80}
                    width={80}
                    // timeout={3000} //3 secs
                  />
                </div>
              )}
              {isLoadingProducts ? (
                <div className={stylish.containerMiddle}>
                  <div className={stylish.loadingFilterProducts}>
                    <Loader
                      type="ThreeDots"
                      color="rgb(117, 111, 228)"
                      height={80}
                      width={80}
                      // timeout={3000} //3 secs
                    />
                  </div>
                </div>
              ) : (
                <div className={stylish.containerMiddle}>
                  {filterID !== "" ? (
                    <FilterallViewProducts
                      arrProductsFilter={arrProductsFilter}
                      filterID={filterID}
                    />
                  ) : (
                    <AllViewProducts
                      categoryNum={this.categoryNumber}
                      isLoadingMoreProducts={isLoadingMoreProducts}
                      arrProducts={arrProducts}
                      count={count}
                      countMore={this.countMore}
                      currentPage={currentPage}
                    />
                  )}
                </div>
              )}
            </div>

            {arrProducts.length > 0 && (
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
