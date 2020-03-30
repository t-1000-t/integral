import React, { Component } from "react";
import ModalProductDetails from "../ModalProductDetails/ModalProductDetails";
import ModalPhoto from "../ModalPhoto/ModalPhoto";

import stylish from "./MainProduct.module.css";

const { imgCard, imgCardFont, imgCardFontBold, img } = stylish;

class MainProduct extends Component {
  state = {
    isOpen: false,
    // isOpenLargeImg: false,
    isOpenPhoto: false
  };

  handleOnModalPhoto = () => {
    const { isOpenPhoto } = this.state;
    this.setState({
      isOpenPhoto: !isOpenPhoto
    });
  };

  handleOnModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  render() {
    const { isOpen, isOpenPhoto } = this.state;
    const { elem } = this.props;
    return (
      <>
        <div className={imgCard}>
          <img
            className={img}
            src={elem.small_image}
            alt="img"
            onClick={this.handleOnModal}
          />
          <div className={imgCardFont}>
            <p>{elem.name}</p>
          </div>
          <div className={imgCardFontBold}>
            {elem.retail_price_uah + " грн."}
          </div>
          <div className={imgCardFont}>{elem.country}</div>
        </div>
        {isOpen && (
          <ModalProductDetails handleOnModal={this.handleOnModal}>
            <button onClick={this.handleOnModalPhoto}>Open Large Photo</button>
            <h2>{elem.productID}</h2>
            <img
              src={elem.medium_image}
              alt="img"
              onClick={this.handleOnModalPhoto}
            />
            <div className={imgCardFont}>
              <p>{elem.name}</p>
            </div>
            <div className={imgCardFontBold}>
              {elem.retail_price_uah + " грн."}
            </div>
            <div className={imgCardFont}>{elem.country}</div>
            {isOpenPhoto && (
              <ModalPhoto handleOnModalPhoto={this.handleOnModalPhoto}>
                <button onClick={this.handleOnModalPhoto}>Close</button>
                <img src={elem.large_image} alt="img" />
              </ModalPhoto>
            )}
          </ModalProductDetails>
        )}
      </>
    );
  }
}

export default MainProduct;
