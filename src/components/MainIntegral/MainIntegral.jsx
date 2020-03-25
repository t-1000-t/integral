import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Bounce from "react-reveal/Bounce";
import db from "../../db/dbcatigories.json";
import TogPanel from "../TogglePanel/TogglePanel";

import styled from "./MainIntegral.module.css";
import routes from "../../routes/routes";
const shortid = require("shortid");

const {
  containerMainIntegral,
  boxContainerInputPanel,
  togglePanel,
  boxSearch,
  wrappInput,
  toggleInputSearch,
  nameLi,
  imgCard,
  imgCardFont,
  imgCardFontBold,
  boxImg,
  img,
  linkStyle
} = styled;

class MainIntegral extends Component {
  state = {
    arrayCategory: [],
    filterCategory: "",
    arrayProducts: [],
    filterProducts: "",
    isLoading: false
  };

  handlerFilterCateg = e => {
    this.setState({
      filterCategory: e.currentTarget.value
    });
  };
  handlerFilterProd = e => {
    this.setState({
      filterProducts: e.currentTarget.value
    });
  };

  componentDidMount() {
    this.fetchArticles();
    this.fetchProducts();
  }

  fetchArticles = () => {
    this.setState({
      arrayCategory: Object.entries(db.categories).map(el => el[1].elem)
    });
  };

  fetchProducts = () => {
    try {
      return fetch("https://shop-integral.herokuapp.com/api/main")
        .then(res => res.json())
        .then(data => data.main)
        .then(arr =>
          this.setState({
            arrayProducts: arr
          })
        );
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const {
      arrayCategory,
      arrayProducts,
      filterCategory,
      filterProducts
    } = this.state;
    const { isOpenPanel, isOpenSearch, toggLogo } = this.props;
    const newArrayCategory = arrayCategory.filter(elem =>
      elem.name.toLowerCase().includes(filterCategory.toLowerCase())
    );
    console.log(newArrayCategory);
    const newArrayProducts = arrayProducts.filter(
      elem =>
        elem.name.toLowerCase().includes(filterProducts.toLowerCase()) ||
        elem.product_code.toLowerCase().includes(filterProducts.toLowerCase())
    );
    // console.log(newArrayProducts);

    return (
      <div className={containerMainIntegral}>
        {isOpenSearch && (
          <Bounce bottom>
            <div className={wrappInput}>
              <input
                className={boxSearch}
                placeholder="Ищу продукт..."
                type="text"
                name="filterProd"
                value={this.state.filterProducts}
                onChange={this.handlerFilterProd}
              ></input>
            </div>
          </Bounce>
        )}
        {isOpenPanel && (
          <TogPanel toggLogo={toggLogo}>
            <Bounce bottom>
              <div className={toggleInputSearch}>
                <input
                  className={boxSearch}
                  placeholder="Найти категорию по названию..."
                  type="text"
                  name="filterCateg"
                  value={this.state.filterCategory}
                  onChange={this.handlerFilterCateg}
                ></input>
              </div>
            </Bounce>
            <div className={togglePanel}>
              {/* <ul> */}
              {newArrayCategory.map(elem => (
                <div key={shortid.generate()} className={nameLi}>
                  <NavLink
                    className={linkStyle}
                    to={{
                      pathname: routes.PRODUCTS,
                      search: `?category=${elem.category}`
                    }}
                  >
                    {elem.name}
                  </NavLink>
                </div>
              ))}
              {/* </ul> */}
            </div>
          </TogPanel>
        )}
        <div className={boxImg}>
          {newArrayProducts &&
            newArrayProducts.map(elem => (
              <div key={elem.productID} className={imgCard}>
                <img className={img} src={elem.small_image} alt="img" />
                <div className={imgCardFont}>
                  <p>{elem.name}</p>
                </div>
                <div className={imgCardFontBold}>
                  {(elem.price_uah * 1.1).toFixed(2) + " грн."}
                </div>
                <div className={imgCardFont}>{elem.country}</div>
              </div>
            ))}
        </div>
        <div className={boxContainerInputPanel}></div>
      </div>
    );
  }
}

export default MainIntegral;
