import React, { Component } from "react";
import { Button, Checkbox } from "semantic-ui-react";

class CategoriesCart extends Component {
  state = { checked: false };
  toggle = () => this.setState(prevState => ({ checked: !prevState.checked }));

  render() {
    const { num, name } = this.props;
    return (
      <div className="btn">
        <Button onClick={this.toggle} size="tiny" inverted color="vk">
          <div className="btnCheck">
            <div className="btnName">{name}</div>
            <Checkbox onChange={this.toggle} checked={this.state.checked} />
          </div>
        </Button>
      </div>
    );
  }
}

export default CategoriesCart;
