import React, { Component, createRef } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../../routes/routes";
import Loader from "react-loader-spinner";
import ScrollButton from "../../services/ScrollButton/ScrollButton";

import stylish from "./IntegralViewCategoryProducts.module.css";

class IntegralViewNotebooks extends Component {
  _isMounted = false;

  state = {
    arrProducts: [],
    textSearch: "",
    isLoading: false,
    getStartNum: 0,
    totalCount: null,
  };

  ulListRef = createRef();

  componentDidMount(prevProps, prevState) {
    this.fetchArrProducts();
  }

  nextCategory = this.props.match.params.categorynum;

  setSearchCategory = () => {
    this.props.history.push({
      ...this.props,
    });
  };

  fetchProducrs(val) {
    console.log("fetch todo started...");
    return fetch(
      // `http://localhost:5000/api/products/${this.nextCategory}/${val}`
      `https://shop-integral.herokuapp.com/api/products/${this.nextCategory}/${val}`
    ).then((res) => res.json());
  }

  async fetchArrProducts() {
    const { getStartNum } = this.state;
    console.log(this.nextCategory);
    this.setState({ isLoading: true });
    try {
      await this.fetchProducrs(getStartNum)
        .then((data) => {
          console.log("data", data);
          if (data.count > 1000) {
            this.setState({ isLoading: true });
            const nIteration = Math.round(data.count / 1000);
            console.log(nIteration);
            for (let i = 0; nIteration >= i; i++) {
              console.log("i", i);
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

  render() {
    const { isLoading, arrProducts, textSearch, totalCount } = this.state;
    console.log("arrProducts", arrProducts);
    console.log("totalCount", totalCount);
    const newArrProducts = arrProducts.filter(
      (elem) =>
        elem.name.toLowerCase().includes(textSearch.toLowerCase()) ||
        elem.product_code.toLowerCase().includes(textSearch.toLowerCase()) ||
        elem.articul.toLowerCase().includes(textSearch.toLowerCase())
    );
    console.log("newArrProducts", newArrProducts);
    return (
      <>
        <div className={stylish.wrapperPage}>
          <div>
            <ScrollButton ulListRef={this.ulListRef} />
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
              {totalCount && (
                <div className={stylish.tCountNum}>{totalCount}</div>
              )}
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
            <ul className={stylish.wrapper} ref={this.ulListRef}>
              {newArrProducts.map((item) =>
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
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default IntegralViewNotebooks;
