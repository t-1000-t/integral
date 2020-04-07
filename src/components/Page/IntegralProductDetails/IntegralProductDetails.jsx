import React, { Component } from "react";
import fetchProductDetails from "../../services/fetchProductDetails";
import Loader from "react-loader-spinner";
import stylish from "./IntegralProductDetails.module.css";
import ModalProductDetails from "../../Modals/ModalProductDetails/ModalProductDetails";

class IntegralProductDetails extends Component {
  state = {
    prodDetails: null,
    isLoading: false,
  };

  fetchViewDetails = async () => {
    this.setState({ isLoading: true });
    const prodID = this.props.match.params.someIDproduct;
    await fetchProductDetails
      .fetchDetails(prodID)
      .then((data) => {
        this.setState({
          prodDetails: data,
        });
      })
      .catch((error) => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.fetchViewDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location === this.props.location) {
      return;
    }
    if (prevProps.location !== this.props.location) {
      this.fetchViewDetails();
    }
  }

  render() {
    const { prodDetails, isLoading } = this.state;
    console.log(prodDetails);
    return (
      <>
        {isLoading && (
          <div className={stylish.loadPosition}>
            <Loader
              type="BallTriangle"
              color="rgb(117, 111, 228)"
              height={80}
              width={80}
              // timeout={3000} //3 secs
            />
          </div>
        )}
        {prodDetails && (
          <div className={stylish.card}>
            <div className={stylish.footerLeft}></div>
            <div className={stylish.footerMiddle}>
              <div className={stylish.wrapperMiddle}>
                <div className={stylish.middleLeft}>
                  <div className={stylish.boxNameCode}>
                    <h3 className={stylish.productName}>{prodDetails.name}</h3>
                    <div className={stylish.prodCode}>
                      Код продукта: {prodDetails.product_code}
                    </div>
                  </div>
                  <div className={stylish.imgDescription}>
                    <img
                      className={stylish.img}
                      src={prodDetails.large_image}
                      alt="foto_small"
                    />
                    <p>{prodDetails.brief_description}</p>
                  </div>
                </div>
                <div className={stylish.middleRight}>
                  <button className={stylish.btnMiddleRight}>
                    Доп. Инф. об продукте
                  </button>

                  <ModalProductDetails>
                    <ul className={stylish.ulRight}>
                      {prodDetails.options.map((elem) => (
                        <li className={stylish.liRight}>
                          {elem.name}: {elem.value}
                        </li>
                      ))}
                    </ul>
                  </ModalProductDetails>
                </div>
              </div>
              <div className={stylish.priceProductDetails}>
                {prodDetails.retail_price_uah} грн.
              </div>
              <button className={stylish.btnProductDetails}>
                <div className={stylish.fontProductDetails}>Купить</div>
              </button>
            </div>

            <div className={stylish.footerRight}></div>
          </div>
        )}
      </>
    );
  }
}

export default IntegralProductDetails;
