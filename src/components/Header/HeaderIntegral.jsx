import React, { Component } from "react";
import styled from "./HeaderIntegral.module.css";

import Icon from "@iconify/react";

import searchOutline from "@iconify/icons-ion/search-outline";
import personCircleOutline from "@iconify/icons-ion/person-circle-outline";
import cartOutline from "@iconify/icons-ion/cart-outline";

import chevronForwardCircleOutline from "@iconify/icons-ion/chevron-forward-circle-outline";
import chevronBackCircleOutline from "@iconify/icons-ion/chevron-back-circle-outline";

const {
  container,
  logo,
  boxLogo,
  list,
  title,
  iconLogo,
  icons,
  boxSearch
} = styled;

class HeaderIntegral extends Component {
  render() {
    const { isOpenPanel, toggLogo, toggFilter } = this.props;
    return (
      <div className={container}>
        <div className={boxLogo}>
          {isOpenPanel ? (
            <Icon
              icon={chevronBackCircleOutline}
              type="batton"
              width="30px"
              className={iconLogo}
              onClick={toggLogo}
            />
          ) : (
            <Icon
              icon={chevronForwardCircleOutline}
              type="batton"
              width="30px"
              className={iconLogo}
              onClick={toggLogo}
            />
          )}
          <div className={logo}>
            <p>integral</p>
          </div>
        </div>

        <div className={list}>
          <ul className={icons}>
            <li className={title}>
              <Icon
                className={boxSearch}
                name="filtet"
                type="batton"
                icon={searchOutline}
                width="30px"
                onClick={toggFilter}
              />
            </li>
            <li className={title}>
              <Icon icon={personCircleOutline} width="30px" />
            </li>
            <li className={title}>
              <Icon icon={cartOutline} width="30px" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default HeaderIntegral;
