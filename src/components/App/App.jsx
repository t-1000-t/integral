import React, { Component } from "react";
import HeaderIntegral from "../Header/HeaderIntegral";
import MainIntegral from "../MainIntegral/MainIntegral";

class App extends Component {
  state = {
    isOpenPanel: false,
    isOpenSearch: false
  };

  toggFilter = () => {
    this.setState({ isOpenSearch: !this.state.isOpenSearch });
  };

  toggLogo = () => {
    this.setState({ isOpenPanel: !this.state.isOpenPanel });
  };

  render() {
    const { isOpenPanel, isOpenSearch } = this.state;
    return (
      <div>
        <HeaderIntegral
          toggLogo={this.toggLogo}
          toggFilter={this.toggFilter}
          isOpenPanel={isOpenPanel}
          isOpenSearch={isOpenSearch}
        />
        <MainIntegral
          toggLogo={this.toggLogo}
          isOpenPanel={isOpenPanel}
          isOpenSearch={isOpenSearch}
        />
      </div>
    );
  }
}

export default App;
