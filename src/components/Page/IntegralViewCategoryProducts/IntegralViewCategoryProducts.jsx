import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../../routes/routes";
import Loader from "react-loader-spinner";

import stylish from "./IntegralViewCategoryProducts.module.css";

class IntegralViewNotebooks extends Component {
  state = {
    arrProducts: [],
    textSearch: "",
    isLoading: false,
  };

  componentDidMount(prevProps, prevState) {
    this.fetchArrProducts();
  }

  nextCategory = new URLSearchParams(this.props.location.search).get(
    "category"
  );

  setSearchCategory = (nextCategory) => {
    this.props.history.push({
      ...this.props.location,
      search: `?category=${nextCategory}`,
    });
  };

  async fetchArrProducts() {
    this.setState({ isLoading: true });
    try {
      await fetch(
        `https://shop-integral.herokuapp.com/api/products${this.props.location.search}`
      )
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            arrProducts: data,
          })
        )
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
    const { isLoading, arrProducts, textSearch } = this.state;

    const newArrProducts = arrProducts.filter(
      (elem) =>
        elem.name.toLowerCase().includes(textSearch.toLowerCase()) ||
        elem.product_code.toLowerCase().includes(textSearch.toLowerCase()) ||
        elem.articul.toLowerCase().includes(textSearch.toLowerCase())
    );

    return (
      <>
        <div className={stylish.wrapperPage}>
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
          <div className={stylish.container}>
            <ul className={stylish.wrapper}>
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
