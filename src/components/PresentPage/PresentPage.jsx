import React, { Component } from "react";

import styled from "./PresentPage.module.css";

export class PresentPage extends Component {
  render() {
    return (
      <div className={styled.wrapper}>
        <div className={styled.container}>
          Лицевая страница, первое что увидит клиент
        </div>
      </div>
    );
  }
}

export default PresentPage;
