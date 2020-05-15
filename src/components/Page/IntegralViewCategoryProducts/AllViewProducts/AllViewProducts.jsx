import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../../../routes/routes";

import stylish from "./AllViewProducts.module.css";

class AllViewProducts extends Component {
  render() {
    const { newArrProducts, currentPage, backCount, nextCount } = this.props;
    return (
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
                      <div className={stylish.fontCountry}>{item.country}</div>
                    </div>
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
                onClick={backCount}
                disabled={currentPage === 0}
              >
                Back
              </button>

              <button
                name="next"
                className={stylish.btnMore}
                type="button"
                onClick={nextCount}
                disabled={currentPage === Number(newArrProducts.length) - 1}
              >
                Next
              </button>
            </>
          )}
        </div>
      </ul>
    );
  }
}

export default AllViewProducts;
