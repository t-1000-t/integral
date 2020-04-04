import React, { Component } from "react";
import fetchProductDetails from "../../services/fetchProductDetails";

class IntegralProductDetails extends Component {
  state = {
    prodDetails: null,
    isOpen: false,
  };

  fetchViewDetails = () => {
    const prodID = this.props.match.params.someIDproduct;
    fetchProductDetails.fetchDetails(prodID).then((data) => {
      this.setState({
        prodDetails: data,
      });
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

  toggleInform = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { prodDetails, isOpen } = this.state;
    console.log(prodDetails);
    return (
      <>
        {prodDetails && (
          <div>
            <h3>{prodDetails.name}</h3>
            <div>{prodDetails.product_code}</div>
            <img src={prodDetails.large_image} alt="foto_small" />
            <p>{prodDetails.brief_description}</p>

            <p>{prodDetails.retail_price_uah}</p>
            <div>
              <button onClick={this.toggleInform}>
                Доп. Информация об продукте
              </button>

              <ul>
                {isOpen &&
                  prodDetails.options.map((elem) => (
                    <li>
                      {elem.name}: {elem.value}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default IntegralProductDetails;
