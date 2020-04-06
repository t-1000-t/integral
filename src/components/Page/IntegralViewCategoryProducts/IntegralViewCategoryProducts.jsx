import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../../routes/routes";
import Loader from "react-loader-spinner";

import stylish from "./IntegralViewCategoryProducts.module.css";

class IntegralViewNotebooks extends Component {
  state = {
    arrProducts: [],
    isLoading: false,
  };

  componentDidMount() {
    this.fetchArrProducts();
  }

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
  render() {
    const { isLoading } = this.state;
    return (
      <>
        <div className={stylish.wrapperPage}>
          <div className={stylish.wrapperTitle}>
            <div className={stylish.title}>Продукты категории</div>
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
              {this.state.arrProducts.map((item) => (
                <li key={item.productID}>
                  <div className={stylish.card}>
                    <NavLink
                      className={stylish.NavLinkProd}
                      to={`${routes.PRODUCT}/${item.productID}`}
                    >
                      <p>{item.name}</p>
                      <div>
                        <img src={item.medium_image} alt={item.articul} />
                      </div>
                      <div className={stylish.fontProdCode}>
                        {item.product_code}
                      </div>
                      <div className={stylish.fontPriceRetail}>
                        {item.retail_price_uah} грн.
                      </div>

                      <div>{item.country}</div>
                      <button>Купить</button>
                    </NavLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default IntegralViewNotebooks;
