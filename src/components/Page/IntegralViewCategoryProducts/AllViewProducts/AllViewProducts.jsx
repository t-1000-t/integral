import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../../../routes/routes";
import stylish from "./AllViewProducts.module.css";

class AllViewProducts extends Component {
  render() {
    const { arrProducts, categoryNum } = this.props;

    return (
      <>
        <ul className={stylish.wrapper}>
          {arrProducts.length > 0 &&
            arrProducts.map((item) =>
              item.stocks.length > 0 ? (
                <li key={item.productID}>
                  <div className={stylish.card}>
                    <div>
                      <p className={stylish.nameItem}>{item.name}</p>
                      <div className={stylish.fontProdCode}>
                        Код Товара: {item.product_code}
                      </div>
                      <NavLink
                        className={stylish.NavLinkProd}
                        to={{
                          pathname: `${routes.PRODUCT}/${item.productID}`,
                          state: { data: categoryNum },
                        }}
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
                      <button
                        className={stylish.btnCard}
                        onClick={this.toggleOpenModalLigPay}
                      >
                        Купить
                      </button>
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
                    </div>
                  </div>
                </li>
              )
            )}
        </ul>
      </>
    );
  }
}

export default AllViewProducts;
