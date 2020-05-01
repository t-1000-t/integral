import React, { Component } from "react";

import stylish from "./SortProducts.module.css";

class SortProducts extends Component {
  state = { activeItem: "" };

  handleItemClick = (e) => {
    console.log(e.currentTarget.name);
    this.setState({
      activeItem: e.currentTarget.name,
    });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div className={stylish.container}>
        <ul className={stylish.boxSortBtn}>
          <li className={stylish.liName}>
            <button
              name="price_low"
              active={activeItem === "price_low"}
              className={stylish.liBtn}
              onClick={this.handleItemClick}
            >
              От дешовых
            </button>
          </li>
          <li className={stylish.liName}>
            <button
              name="price_high"
              active={activeItem === "price_high"}
              className={stylish.liBtn}
              onClick={this.handleItemClick}
            >
              От дорогих
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default SortProducts;
