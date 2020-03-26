import React, { Component } from "react";
import styled from "./AboutPage.module.css";

class AboutPage extends Component {
  render() {
    return (
      <div className={styled.wrapper}>
        <div className={styled.container}>Информация о магазине Integral</div>{" "}
      </div>
    );
  }
}

export default AboutPage;
