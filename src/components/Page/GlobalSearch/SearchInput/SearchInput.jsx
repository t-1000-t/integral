import React, { Component, createRef } from "react";
import T from "prop-types";
import styles from "./Search.module.css";

const searchform = [styles.searchform];

export default class SearchInput extends Component {
  static propTypes = {
    onSearch: T.func.isRequired,
    onFetch: T.func.isRequired,
  };

  state = { query: "" };

  searchRef = createRef();

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    const { onSearch, onFetch } = this.props;
    if (this.searchRef.current.value === "") {
      onFetch();
    }
    onSearch(query);

    // this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    return (
      <form className={searchform} onSubmit={this.handleSubmit}>
        <input
          ref={this.searchRef}
          type="text"
          onChange={this.handleChange}
          value={query}
          autoComplete="off"
          placeholder="Поиск продукта..."
        />
      </form>
    );
  }
}
