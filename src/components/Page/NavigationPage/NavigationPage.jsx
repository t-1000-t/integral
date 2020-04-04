import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import stylish from "./NavigationPage.module.css";
import routes from "../../../routes/routes";

class NavigationPage extends Component {
  render() {
    return (
      <div>
        <ul className={stylish.wrapper}>
          <li className={stylish.integral}>
            <NavLink
              exact
              style={{ color: "#212121" }}
              activeStyle={{ color: "palevioletred" }}
              to={routes.HOME}
            >
              integral
            </NavLink>
          </li>
          <li className={stylish.main}>
            <NavLink
              exact
              style={{ color: "#212121" }}
              activeStyle={{ color: "palevioletred" }}
              to={routes.MAIN}
            >
              main
            </NavLink>
          </li>
          <li className={stylish.about}>
            <NavLink
              exact
              style={{ color: "#212121" }}
              activeStyle={{ color: "palevioletred" }}
              to={routes.ABOUT}
            >
              about
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavigationPage;
