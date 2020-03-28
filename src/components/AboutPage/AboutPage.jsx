import React, { Component } from "react";
import stylish from "./AboutPage.module.css";

class AboutPage extends Component {
  render() {
    return (
      <div className={stylish.wrapper}>
        <div className={stylish.container}>
          Информация о магазине Integral
          <div className={stylish.iconLogo}></div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
