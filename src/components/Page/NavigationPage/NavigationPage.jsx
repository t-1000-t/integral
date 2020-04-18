import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import stylish from "./NavigationPage.module.css";
import routes from "../../../routes/routes";
// npm install --save-dev @iconify/react @iconify/icons-ion
import { Icon } from "@iconify/react";
import callOutline from "@iconify/icons-ion/call-outline";
import headsetOutline from "@iconify/icons-ion/headset-outline";
import mailOpenOutline from "@iconify/icons-ion/mail-open-outline";
import chatboxEllipsesOutline from "@iconify/icons-ion/chatbox-ellipses-outline";

class NavigationPage extends Component {
  render() {
    return (
      <div className={stylish.boxWrapper}>
        {/* <div className={stylish.headerMenu}></div> */}
        <ul className={stylish.wrapper}>
          {/* <li className={stylish.headerMenu}></li> */}
          <li className={stylish.integral}>
            <NavLink className={stylish.logoNavLink} exact to={routes.HOME}>
              <p className={stylish.logo}>Integral</p>
              <div className={stylish.basta}></div>
            </NavLink>
          </li>
          <li className={stylish.middleNavigation}>
            <NavLink exact to={routes.HOME}>
              <button className={stylish.home}>home</button>
            </NavLink>
            <div className={stylish.header_burger}>
              <span></span>
            </div>
            {/* <NavLink exact to={routes.MAIN}>
              <button className={stylish.main}>main</button>
            </NavLink> */}
            <NavLink exact to={routes.ABOUT}>
              <button className={stylish.about}>about</button>
            </NavLink>
          </li>
          <li className={stylish.support}>
            <div className={stylish.boxSupport1}>
              <Icon className={stylish.iconCall} icon={callOutline} />
              {/* <Icon className={stylish.iconHeadset} icon={headsetOutline} /> */}
              <div className={stylish.suppNomber}>
                (+38) 066 <b>911</b> 0347
              </div>
            </div>
            <br />
            <div className={stylish.boxSupport2}>
              <Icon className={stylish.iconMail} icon={mailOpenOutline} />
              <div className={stylish.suppMail}>
                <a className={stylish.linkMail} href="mailto:info@integral.com">
                  info@integral.com
                </a>
              </div>
            </div>
            <div className={stylish.boxSupport2}>
              <Icon
                className={stylish.iconViber}
                icon={chatboxEllipsesOutline}
              />
              <div className={stylish.suppViber}>
                <a
                  className={stylish.linkMail}
                  title="Должен быть установлен Viber для ПК"
                  href="viber://chat?number=+380669110347"
                >
                  Написать в Viber
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavigationPage;
