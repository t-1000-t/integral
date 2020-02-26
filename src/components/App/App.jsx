import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import CategoriesCart from "../Cart/CategoriesCart";
import Menu from "../Menu/Menu";
import "./App.css";

class App extends Component {
  state = {
    array: [],
    cart: []
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

  addNote = (num, name, key) => {
    const note = {
      count: num,
      name: name,
      category: key,
      data: new Date().toISOString()
    };

    if (this.state.cart.find(elem => elem.category === note.category)) {
      return;
    } else {
      this.setState(state => ({
        cart: [...state.cart, note]
      }));
    }
  };

  addArr = () => {
    this.state.cart.map(elem => this.addFetch(elem));
  };

  addFetch = async elem => {
    const res = await fetch(
      "https://base-catigories.firebaseio.com/categories.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ elem })
      }
    );
    const data = await res.json();
    console.log("Data", data);
  };

  render() {
    const { array } = this.state;

    return (
      <Container>
        <Menu />
        <form action="">
          {!array
            ? "Загрузка..."
            : array.map(elem => (
                <CategoriesCart
                  key={elem.categoryID}
                  id={elem.categoryID}
                  num={elem.parentID}
                  name={elem.name}
                  addNote={this.addNote}
                />
              ))}
        </form>
        <div className="btnFooter">
          <div type="button" className="Button" onClick={this.addArr}>
            SAVE
          </div>
        </div>
      </Container>
    );
  }
}

export default App;
