import React, { Component } from "react";
import fetchProductDetails from "../../services/fetchProductDetails";
import fetchCommetsProduct from "../../services/fetchCommetsProduct";
import fetchPicturesProduct from "../../services/fetchPicturesProduct";
import Loader from "react-loader-spinner";
import stylish from "./IntegralProductDetails.module.css";
import PhotoCard from "./PhotoCard/PhotoCard";
import ModalLiqPay from "../../Modals/ModalLiqPay/ModalLiqPay";
import routes from "../../../routes/routes";

class IntegralProductDetails extends Component {
  state = {
    isOpenModalLiqPay: false,
    isOpenInfo: false,
    prodDetails: null,
    isLoading: false,
    pictures: null,
    // comments: null,
    stocksexpect: null,
  };

  sortByDate = (obj) => {
    return Object.values(obj).sort(function (a, b) {
      return new Date(a) - new Date(b);
    });
  };

  fetchViewDetails = async () => {
    this.setState({ isLoading: true });
    const prodID = this.props.match.params.someIDproduct;
    await fetchProductDetails
      .fetchDetails(prodID)
      .then((data) => {
        this.setState({
          prodDetails: data,
          stocksexpect: this.sortByDate(data.stocks_expected),
        });
      })
      .catch((error) => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  getPictures = async () => {
    const prodID = this.props.match.params.someIDproduct;
    await fetchPicturesProduct
      .fetchProducts(prodID)
      .then((data) => {
        this.setState({
          pictures: data,
        });
      })
      .catch((error) => {
        this.setState({ error });
      })
      .finally();
  };

  getComments = async () => {
    const prodID = this.props.match.params.someIDproduct;
    await fetchCommetsProduct
      .fetchCommets(prodID)
      .then((data) => {
        this.setState({
          comments: data,
        });
      })
      .catch((error) => {
        this.setState({ error });
      })
      .finally();
  };

  componentDidMount() {
    const persistedProdDetail = localStorage.getItem("ProdDetail");

    if (persistedProdDetail) {
      this.setState({ ProdDetail: JSON.parse(persistedProdDetail) });
    }
    if (!persistedProdDetail) {
      this.fetchViewDetails();
      this.getPictures();
    }
    // this.getComments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location === this.props.location) {
      return;
    }
    if (prevProps.location !== this.props.location) {
      this.fetchViewDetails();
      localStorage.setItem("ProdDetail", JSON.stringify(this.props.location));
    }
  }

  handleOnModal = () => {
    const { isOpenModalLiqPay } = this.state;
    this.setState({
      isOpenModalLiqPay: !isOpenModalLiqPay,
    });
  };

  toggleBtmInfo = () => {
    const { isOpenInfo } = this.state;
    this.setState({
      isOpenInfo: !isOpenInfo,
    });
  };

  setHistoryPush = () => {
    this.props.history.push({
      ...this.props.location,
      pathname: `${routes.PRODUCTS}/${this.props.location.state.data}`,
    });
  };

  render() {
    const {
      isOpenModalLiqPay,
      prodDetails,
      isLoading,
      pictures,
      isOpenInfo,
      stocksexpect,
    } = this.state;

    console.log(
      "this.props.location.state.data",
      this.props.location.state.data
    );

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
            <div className={stylish.mainLeft}>
              <div className={stylish.containerLeft}>
                <button
                  className={stylish.BtnBack}
                  onClick={this.setHistoryPush}
                >
                  Back
                </button>
              </div>
            </div>
            <div className={stylish.mainMiddle}>
              <div className={stylish.wrapperMiddle}>
                <div className={stylish.middleLeft}>
                  <div className={stylish.boxNameCode}>
                    <h3 className={stylish.productName}>{prodDetails.name}</h3>
                    <div className={stylish.prodCode}>
                      Код продукта: {prodDetails.product_code}
                    </div>
                  </div>
                  <div className={stylish.imgDescription}>
                    {prodDetails.stocks.length > 0 ? (
                      <img
                        className={stylish.img}
                        src={prodDetails.medium_image}
                        alt="foto_small"
                      />
                    ) : (
                      <img
                        className={stylish.imgNoProdu}
                        src={prodDetails.medium_image}
                        alt="foto_small"
                      />
                    )}
                    <p className={stylish.infoProdImg}>
                      {prodDetails.brief_description}
                    </p>
                  </div>
                </div>
                <div>
                  <div className={stylish.middleRight}>
                    {stocksexpect.length > 0 ? (
                      <button
                        className={stylish.btnMiddleRight}
                        onClick={this.toggleBtmInfo}
                      >
                        Больше информации
                      </button>
                    ) : (
                      <button
                        disabled={stocksexpect.length === 0}
                        className={stylish.btnMiddleRight}
                        onClick={this.toggleBtmInfo}
                      >
                        Больше информации
                      </button>
                    )}
                  </div>

                  {isOpenInfo && (
                    <ul className={stylish.ulRight}>
                      {prodDetails.options.map((elem) => (
                        <li className={stylish.liRight}>
                          {elem.name}: {elem.value}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {prodDetails.stocks.length > 0 ? (
                <div className={stylish.priceProductDetails}>
                  {prodDetails.retail_price_uah} грн.
                </div>
              ) : (
                <div className={stylish.priceProductDetails}>
                  <div className={stylish.productExpect}> НЕТ В НАЛИЧИИ!</div>
                  <br></br> Ближайшее поступление на склад -
                  {stocksexpect.length > 0
                    ? ` ${stocksexpect[0]}`
                    : " не планируется!"}
                </div>
              )}
              <button
                className={stylish.btnProductDetails}
                onClick={this.handleOnModal}
                disabled={stocksexpect.length === 0}
              >
                <div className={stylish.fontProductDetails}>Купить</div>
              </button>

              {isOpenInfo && (
                <div className={stylish.boxMoreFoto}>
                  {pictures &&
                    pictures.map((elem) => (
                      <div className={stylish.listFoto}>
                        <PhotoCard elem={elem} />
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className={stylish.mainRight}></div>

            {isOpenModalLiqPay && (
              <ModalLiqPay onClose={this.handleOnModal}>
                Окно для оформления платежа в разработке
              </ModalLiqPay>
            )}
          </div>
        )}
      </>
    );
  }
}

export default IntegralProductDetails;
