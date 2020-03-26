import React, { Component } from "react";
import ProductDateil from "../ProductDateil/ProductDateil";

import styled from "./Categories.module.css";

const { boxImg } = styled;

class Categories extends Component {
  state = {
    listProducts: []
  };

  fetchCategories() {
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
    this.fetchCategories();
  }

  render() {
    const { listProducts } = this.state;
    console.log("listProducts", listProducts);
    return (
      <>
        <ul className={boxImg}>
          {listProducts &&
            listProducts.map(elem => (
              <li key={elem.id}>
                <ProductDateil elem={elem} />
              </li>
            ))}
        </ul>
      </>
    );
  }
}

export default Categories;
