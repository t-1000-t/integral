import React, { Component, createRef } from "react";
import stylish from "./HeaderIntegral.module.css";

import Icon from "@iconify/react";

import searchOutline from "@iconify/icons-ion/search-outline";
import personCircleOutline from "@iconify/icons-ion/person-circle-outline";
import cartOutline from "@iconify/icons-ion/cart-outline";

import chevronForwardCircleOutline from "@iconify/icons-ion/chevron-forward-circle-outline";

const {
  container,
  logo,
  boxLogo,
  list,
  iconRight,
  IconMenuNav,
  icons,
  boxIcon,
  IconLabel
} = stylish;

class HeaderIntegral extends Component {
  iconRef = createRef();
  iconFilterRef = createRef();

  render() {
    const { toggLogo, toggFilter } = this.props;
    return (
      <div className={container}>
        <div className={boxLogo}>
          <button className={iconRight}>
            <div className={boxIcon}>
              <Icon
                name="right"
                type="batton"
                icon={chevronForwardCircleOutline}
                width="30px"
                onClick={toggLogo}
                className={IconLabel}
              ></Icon>
            </div>
          </button>

          <div className={logo}>
            <p>integral</p>
          </div>
        </div>

        <div className={list}>
          <div className={icons}>
            <button className={IconMenuNav}>
              <div className={boxIcon}>
                <Icon
                  className={IconLabel}
                  name="filtet"
                  type="batton"
                  icon={searchOutline}
                  width="30px"
                  onClick={toggFilter}
                />
              </div>
            </button>
            <button className={IconMenuNav}>
              <div className={boxIcon}>
                <Icon
                  icon={personCircleOutline}
                  width="30px"
                  className={IconLabel}
                />
              </div>
            </button>
            <button className={IconMenuNav}>
              <div className={boxIcon}>
                <Icon icon={cartOutline} width="30px" className={IconLabel} />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderIntegral;
