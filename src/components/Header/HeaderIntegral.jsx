import React, { Component, createRef } from "react";
import styled from "./HeaderIntegral.module.css";

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
  title,
  iconRight,
  icons,
  boxSearch,
  boxIcon,
  IconLabel
} = styled;

class HeaderIntegral extends Component {
  iconRef = createRef();
  iconFilterRef = createRef();

  // onGetFilter = () => {
  //   this.props.toggFilter();
  // };

  render() {
    console.log(this.iconFilterRef);
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
            <button className={title} ref={this.iconFilterRef}>
              <div className={boxIcon}>
                <Icon
                  ref={this.iconFilterRef}
                  className={boxSearch}
                  name="filtet"
                  type="batton"
                  icon={searchOutline}
                  width="30px"
                  onClick={toggFilter}
                />
              </div>
            </button>
            <button className={title}>
              <div className={boxIcon}>
                <Icon icon={personCircleOutline} width="30px" />
              </div>
            </button>
            <button className={title}>
              <div className={boxIcon}>
                <Icon icon={cartOutline} width="30px" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderIntegral;
