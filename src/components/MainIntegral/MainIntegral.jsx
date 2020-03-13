import React, { Component } from "react";
import Bounce from "react-reveal/Bounce";
import db from "../../db/dbcatigories.json";

import styled from "./MainIntegral.module.css";

const {
  containerMainIntegral,
  boxContainerInputPanel,
  togglePanel,
  boxPanel,
  boxSearch,
  wrappInput,
  nameLi
} = styled;

class MainIntegral extends Component {
  state = {
    array: [],
    filter: "",
    isLoading: false
  };

  handlerFilterChange = e => {
    this.setState({
      filter: e.currentTarget.value
    });
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    this.setState({
      array: Object.entries(db.categories).map(el => el[1].elem)
    });
  };

  // fetchArticles = () => {
  //   try {
  //     return fetch("https://shop-integral.herokuapp.com/categories")
  //       .then(res => res.json())
  //       .then(data => data.result)
  //       .then(arr =>
  //         this.setState({
  //           array: arr
  //         })
  //       );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  render() {
    const { array, filter } = this.state;

    const { isOpenPanel, isOpenSearch } = this.props;

    const filterArray = array.filter(elem =>
      elem.name.toLowerCase().includes(filter.toLowerCase())
    );
    console.log(array);
    // const base = Object.entries(db.categories).map(el => el[1].elem);
    // console.log(base);
    return (
      <div className={containerMainIntegral}>
        {isOpenSearch && (
          <Bounce bottom>
            <div className={wrappInput}>
              <input
                className={boxSearch}
                placeholder="Ввведите навание продукта..."
                type="text"
                name="filter"
                value={this.state.filter}
                onChange={this.handlerFilterChange}
              ></input>
            </div>
          </Bounce>
        )}

        <div className={boxContainerInputPanel}>
          <div className={boxPanel}>
            {isOpenPanel && (
              <div className={togglePanel}>
                <ul>
                  <Bounce left>
                    {filterArray.map(elem => (
                      <li className={nameLi} key={elem.categoryID}>
                        {elem.name}
                      </li>
                    ))}
                  </Bounce>
                </ul>
              </div>
            )}
            <div>345 {}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainIntegral;
