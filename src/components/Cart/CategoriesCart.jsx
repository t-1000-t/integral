import React, { Component } from "react";

class CategoriesCart extends Component {
  state = {
    checked: false
  };

  toggle = e => {
    const { addNote, num, name, id } = this.props;
    this.setState(prevState => ({ checked: !prevState.checked }));
    addNote(num, name, id);
  };

  render() {
    const { num, name, id } = this.props;
    const { cart } = this.state;
    console.log(cart);

    return (
      <div className="btn" onClick={this.toggle}>
        <div className="Button">
          <div className="btnName">{name}</div>
          <div className="btnInput">
            <input
              id={id}
              count={num}
              type="checkbox"
              checked={this.state.checked}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CategoriesCart;
