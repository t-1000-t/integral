import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import CategoriesCart from "../Cart/CategoriesCart";
import Menu from "../Menu/Menu";
import "./App.css";

class App extends Component {
  state = {
    array: []
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    try {
      return fetch("https://shop-integral.herokuapp.com/categories")
        .then(res => res.json())
        .then(data => data.result)
        .then(arr =>
          this.setState({
            array: arr
          })
        );
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { array } = this.state;
    console.log(array);
    return (
      <Container>
        <Menu />

        {!array
          ? "Загрузка..."
          : array.map(elem => (
              <CategoriesCart
                key={elem.categoryID}
                num={elem.parentID}
                name={elem.name}
              />
            ))}
      </Container>
    );
  }
}

export default App;
