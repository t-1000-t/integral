import React, { Component } from "react";

import stylish from "./PresentPage.module.css";

const {
  wrapper,
  container,
  containerHover,
  hoverButton,
  hoverButtonOff,
  hoverButtonOn
} = stylish;

export class PresentPage extends Component {
  state = {
    hover: false
  };

  hoverEnter = () => {
    this.setState({ hover: true });
  };

  hoverLeave = () => {
    this.setState({ hover: false });
  };

  render() {
    const { hover } = this.state;
    let styleContainer;
    if (hover) {
      styleContainer = { containerHover };
    } else {
      styleContainer = { container };
    }
    return (
      <div className={wrapper}>
        <div
          className={styleContainer}
          onMouseEnter={this.hoverEnter}
          onMouseLeave={this.hoverLeave}
        >
          Лицевая страница, первое что увидит клиент
        </div>
        <button class={hoverButton}>
          <div class={hoverButtonOff}>Default</div>
          <div class={hoverButtonOn}>Hover!</div>
        </button>
      </div>
    );
  }
}

export default PresentPage;
