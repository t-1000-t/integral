import React, { Component } from "react";
import ModalProductDetails from "../ModalProductDetails/ModalProductDetails";
import stylish from "./ProductDateil.module.css";
import ModalPhoto from "../ModalPhoto/ModalPhoto";

const { imgCard, imgCardFont, imgCardFontBold, img } = stylish;

class ProductDateil extends Component {
  state = {
    isOpen: false,
    isOpenPhotoCategory: false
  };

  handleOnModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  handleOnModalPhotoCategory = () => {
    const { isOpenPhotoCategory } = this.state;
    this.setState({
      isOpenPhotoCategory: !isOpenPhotoCategory
    });
  };

  render() {
    const { isOpen, isOpenPhotoCategory } = this.state;
    const { elem } = this.props;
    return (
      <>
        <div key={elem.productID} className={imgCard}>
          {/* <div className={imgCardFontBold}>{elem.categoryID}</div>
          <div className={imgCardFontBold}>{elem.productID}</div> */}
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
            {(elem.price_uah * 1.1).toFixed(2) + " грн."}
          </div>
          <div className={imgCardFont}>{elem.country}</div>
        </div>
        {isOpen && (
          <ModalProductDetails handleOnModal={this.handleOnModal}>
            <h2>{elem.productID}</h2>
            <button onClick={this.handleOnModalPhotoCategory}>
              Open Large Photo Category
            </button>
            <img
              src={elem.medium_image}
              alt="img"
              onClick={this.handleOnModalPhotoCategory}
            />
            <div className={imgCardFont}>
              <p>{elem.name}</p>
            </div>
            <div className={imgCardFontBold}>
              {(elem.price_uah * 1.1).toFixed(2) + " грн."}
            </div>
            <div className={imgCardFont}>{elem.country}</div>
            {isOpenPhotoCategory && (
              <ModalPhoto handleOnModalPhoto={this.handleOnModalPhotoCategory}>
                <button onClick={this.handleOnModalPhotoCategory}>Close</button>
                <img src={elem.large_image} alt="img" />
              </ModalPhoto>
            )}
          </ModalProductDetails>
        )}
      </>
    );
  }
}

export default ProductDateil;
