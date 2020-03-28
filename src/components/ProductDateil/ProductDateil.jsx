import React, { Component } from "react";
import ModalProductDetails from "../ModalProductDetails/ModalProductDetails";
import stylish from "./ProductDateil.module.css";

const { imgCard, imgCardFont, imgCardFontBold, img } = stylish;

class ProductDateil extends Component {
  state = {
    isOpen: false
  };

  handleOnModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
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
            <img
              src={elem.medium_image}
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
          </ModalProductDetails>
        )}
      </>
    );
  }
}

export default ProductDateil;
