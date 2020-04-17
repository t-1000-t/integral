import React, { Component } from "react";
import fetchProductCodeDetails from "../../services/fetchProductCodeDetails";
import fetchCommetsProduct from "../../services/fetchCommetsProduct";
import fetchPicturesProduct from "../../services/fetchPicturesProduct";
import Loader from "react-loader-spinner";
import stylish from "./IntegralProduct_CodeDetails.module.css";
import PhotoCard from "./PhotoCard/PhotoCard";

class IntegralProduct_CodeDetails extends Component {
  state = {
    isOpen: false,
    prodCodeDetails: null,
    isLoading: false,
    pictures: null,
    comments: null,
  };

  fetchViewDetails = async () => {
    this.setState({ isLoading: true });
    const prodID = this.props.match.params.someIDproduct;
    console.log(prodID);
    await fetchProductCodeDetails
      .fetchCodeDetails(prodID)
      .then((data) => {
        this.setState({
          prodCodeDetails: data,
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
    this.fetchViewDetails();
    this.getPictures();
    this.getComments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location === this.props.location) {
      return;
    }
    if (prevProps.location !== this.props.location) {
      this.fetchViewDetails();
    }
  }

  handleOnModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  render() {
    const { prodCodeDetails, isLoading, pictures } = this.state;
    console.log(prodCodeDetails);
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
        {prodCodeDetails && (
          <div className={stylish.card}>
            <div className={stylish.mainLeft}></div>
            <div className={stylish.mainMiddle}>
              <div className={stylish.wrapperMiddle}>
                <div className={stylish.middleLeft}>
                  <div className={stylish.boxNameCode}>
                    <h3 className={stylish.productName}>
                      {prodCodeDetails.name}
                    </h3>
                    <div className={stylish.prodCode}>
                      Код продукта: {prodCodeDetails.product_code}
                    </div>
                  </div>
                  <div className={stylish.imgDescription}>
                    <img
                      className={stylish.img}
                      src={prodCodeDetails.medium_image}
                      alt="foto_small"
                    />
                    <p>{prodCodeDetails.brief_description}</p>
                  </div>
                </div>
                <div className={stylish.middleRight}>
                  <button className={stylish.btnMiddleRight}>
                    Кнопка без назначения
                  </button>

                  <ul className={stylish.ulRight}>
                    {prodCodeDetails.options.map((elem) => (
                      <li className={stylish.liRight}>
                        {elem.name}: {elem.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={stylish.priceProductDetails}>
                {prodCodeDetails.retail_price_uah} грн.
              </div>
              <button className={stylish.btnProductDetails}>
                <div className={stylish.fontProductDetails}>Купить</div>
              </button>
              <div className={stylish.boxMoreFoto}>
                {pictures &&
                  pictures.map((elem) => (
                    <div className={stylish.listFoto}>
                      <PhotoCard elem={elem} />
                    </div>
                  ))}
              </div>
            </div>

            <div className={stylish.mainRight}></div>
          </div>
        )}
      </>
    );
  }
}

export default IntegralProduct_CodeDetails;
