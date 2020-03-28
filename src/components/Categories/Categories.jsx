import React, { Component } from "react";
import ProductDateil from "../ProductDateil/ProductDateil";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import stylish from "./Categories.module.css";

const { boxImg, loadPoition } = stylish;

class Categories extends Component {
  state = {
    listProducts: [],
    isLoading: false
  };

  fetchCategories() {
    this.setState({ isLoading: true });
    const category = new URLSearchParams(this.props.location.search).get(
      "category"
    );

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
  }

  componentDidMount() {
    this.fetchCategories();
  }

  render() {
    const { listProducts, isLoading } = this.state;

    return (
      <>
        {isLoading && (
          <div className={loadPoition}>
            <Loader
              type="BallTriangle"
              color="rgb(117, 111, 228)"
              height={80}
              width={80}
              // timeout={3000} //3 secs
            />
          </div>
        )}
        <ul className={boxImg}>
          {listProducts &&
            listProducts.map(elem => (
              <li key={elem.productID}>
                <ProductDateil elem={elem} />
              </li>
            ))}
        </ul>
      </>
    );
  }
}

export default Categories;
