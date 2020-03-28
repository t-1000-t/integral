import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Bounce from "react-reveal/Bounce";
import db from "../../db/dbcatigories.json";
import TogPanel from "../TogglePanel/TogglePanel";
import MainProduct from "../MainProduct/MainProduct";
import shortid from "shortid";

import stylish from "./MainIntegral.module.css";
import routes from "../../routes/routes";

const {
  containerMainIntegral,
  boxContainerInputPanel,
  togglePanel,
  boxSearch,
  wrappInput,
  toggleInputSearch,
  nameLi,
  boxImg,
  linkStyle,
  loadPosition
} = stylish;

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
    this.fetchLocalCategories();
    this.fetchProducts();
  }

  fetchLocalCategories = () => {
    const listCategory = Object.entries(db.categories).map(el => el[1].elem);

    this.setState({
      arrayCategory: listCategory.flat(3)
    });
  };

  fetchProducts = () => {
    this.setState({ isLoading: true });
    try {
      return fetch("https://shop-integral.herokuapp.com/api/main")
        .then(res => res.json())
        .then(data => data.main)
        .then(arr =>
          this.setState({
            arrayProducts: arr
          })
        )
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const {
      arrayCategory,
      arrayProducts,
      filterCategory,
      filterProducts,
      isLoading
    } = this.state;
    const { isOpenPanel, isOpenSearch, toggLogo } = this.props;

    const newArrayCategory = arrayCategory.filter(elem =>
      elem.name.toLowerCase().includes(filterCategory.toLowerCase())
    );

    const newArrayProducts = arrayProducts.filter(
      elem =>
        elem.name.toLowerCase().includes(filterProducts.toLowerCase()) ||
        elem.product_code.toLowerCase().includes(filterProducts.toLowerCase())
    );

    return (
      <div className={containerMainIntegral}>
        {isLoading && (
          <div className={loadPosition}>
            <Loader
              type="BallTriangle"
              color="rgb(117, 111, 228)"
              height={80}
              width={80}
              // timeout={3000} //3 secs
            />
          </div>
        )}
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
            </div>
          </TogPanel>
        )}
        <div className={boxImg}>
          {newArrayProducts &&
            newArrayProducts.map(elem => (
              <MainProduct key={elem.productID} elem={elem} />
            ))}
        </div>
        <div className={boxContainerInputPanel}></div>
      </div>
    );
  }
}

export default MainIntegral;
