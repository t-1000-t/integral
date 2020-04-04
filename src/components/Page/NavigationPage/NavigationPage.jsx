import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import stylish from "./NavigationPage.module.css";
import routes from "../../../routes/routes";

class NavigationPage extends Component {
  render() {
    return (
      <div>
        <ul className={stylish.wrapper}>
          <li className={stylish.integral}>Integral</li>
          <li className={stylish.middleNavigation}>
            <NavLink
              exact
              style={{ color: "#212121" }}
              activeStyle={{ color: "palevioletred" }}
              to={routes.HOME}
            >
              <button className={stylish.home}>home</button>
            </NavLink>
            <NavLink
              exact
              style={{ color: "#212121" }}
              activeStyle={{ color: "palevioletred" }}
              to={routes.MAIN}
            >
              <button className={stylish.main}>main</button>
            </NavLink>
            <NavLink
              exact
              style={{ color: "#212121" }}
              activeStyle={{ color: "palevioletred" }}
              to={routes.ABOUT}
            >
              <button className={stylish.about}>about</button>
            </NavLink>
          </li>
          <li className={stylish.support}>
            Support (+38 066) 9110347 <br /> Email: info@integral.com
          </li>
        </ul>
      </div>
    );
  }
}

export default NavigationPage;
