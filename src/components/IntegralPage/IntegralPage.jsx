import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import stylish from "./IntegralPage.module.css";

class IntegralPage extends Component {
  render() {
    return (
      <div>
        <ul className={stylish.wrapper}>
          <li className={stylish.integral}>
            <NavLink
              exact
              style={{ color: "#212121" }}
              activeStyle={{ color: "palevioletred" }}
              to="/"
            >
              integral
            </NavLink>
          </li>
          <li className={stylish.main}>
            <NavLink
              exact
              style={{ color: "#212121" }}
              activeStyle={{ color: "palevioletred" }}
              to="/main"
            >
              main
            </NavLink>
          </li>
          <li className={stylish.about}>
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
