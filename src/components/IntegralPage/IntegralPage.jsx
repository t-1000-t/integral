import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "./IntegralPage.module.css";

class IntegralPage extends Component {
  render() {
    return (
      <div>
        <ul className={styled.wrapper}>
          <li>
            <NavLink
              exact
              style={{ color: "#212121" }}
              activeStyle={{ color: "palevioletred" }}
              to="/"
            >
              integral
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              style={{ color: "#212121" }}
              activeStyle={{ color: "palevioletred" }}
              to="/main"
            >
              main
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              style={{ color: "#212121" }}
              activeStyle={{ color: "palevioletred" }}
              to="/about"
            >
              about
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default IntegralPage;
