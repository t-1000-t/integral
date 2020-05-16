import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../../routes/routes";
import stylish from "./FilterallViewProducts.module.css";

class FilterallViewProducts extends Component {
  render() {
    const { arrProductsFilter } = this.props;

    return (
      <ul className={stylish.wrapper}>
        {arrProductsFilter.length > 0 &&
          arrProductsFilter.map((item) => (
            <li>
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
                    <div className={stylish.fontCountry}>{item.country}</div>
                  </div>
                  <button
                    className={stylish.btnCard}
                    onClick={this.toggleOpenModalLigPay}
                  >
                    Купить
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    );
  }
}

export default FilterallViewProducts;
