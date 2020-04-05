import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import stylish from "./NavigationPage.module.css";
import routes from "../../../routes/routes";
// npm install --save-dev @iconify/react @iconify/icons-ion
import { Icon } from "@iconify/react";
import callOutline from "@iconify/icons-ion/call-outline";
import headsetOutline from "@iconify/icons-ion/headset-outline";
import mailOpenOutline from "@iconify/icons-ion/mail-open-outline";

class NavigationPage extends Component {
  render() {
    return (
      <div>
        <ul className={stylish.wrapper}>
          <li className={stylish.integral}>
            <p className={stylish.logo}>Integral</p>
            <div className={stylish.basta}></div>
          </li>
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
            <Icon className={stylish.iconCall} icon={callOutline} />
            <Icon className={stylish.iconHeadset} icon={headsetOutline} />
            <b>Support</b> (+38 066) 9110347 <br />
            <Icon className={stylish.iconMail} icon={mailOpenOutline} /> Email:
            info@integral.com
          </li>
        </ul>
      </div>
    );
  }
}

export default NavigationPage;
