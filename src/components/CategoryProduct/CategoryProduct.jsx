import React, { Component } from "react";

import styled from "./CategoryProduct.module.css";

const { imgCard, imgCardFont, imgCardFontBold, img, boxImg } = styled;

class CategoryProduct extends Component {
  state = {
    listProducts: []
  };

  fetchCategoryProducts() {
    const category = new URLSearchParams(this.props.location.search).get(
      "category"
    );
    console.log(category);
    try {
      return fetch(
        `https://shop-integral.herokuapp.com/api/products?category=${category}`
      )
        .then(res => res.json())
        .then(data => data)
        .then(arr =>
          this.setState({
            listProducts: arr
          })
        );
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    this.fetchCategoryProducts();
  }

  render() {
    const { listProducts } = this.state;
    console.log(listProducts);
    return (
      <div className={boxImg}>
        {listProducts &&
          listProducts.map(elem => (
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
    );
  }
}

export default CategoryProduct;
