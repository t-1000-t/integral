import React, { Component } from "react";
// import T from "prop-types";
import stylish from "./PhotoCard.module.css";
import ModalPicturesPage from "../../../Modals/ModalPicturesPage/ModalPicturesPage";
import { Icon } from "@iconify/react";
import moveIcon from "@iconify/icons-ion/move";

const photocard = [stylish.photocard];
const fullscreenbutton = [stylish.fullscreenbutton];

class PhotoCard extends Component {
  static = {};

  propTypes = {
    // id: T.number.isRequired,
    // webformatURL: T.string.isRequired,
    // largeImageURL: T.string.isRequired,
  };

  state = {
    isOpen: false,
  };

  handleOnModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  render() {
    const { elem } = this.props;
    const { isOpen } = this.state;
    return (
      <div key={elem.priority} className={photocard}>
        <img src={elem.small_image} alt="img" />

        <button
          type="button"
          className={fullscreenbutton}
          onClick={this.handleOnModal}
        >
          {/* <i className="material-icons">zoom_out_map</i> */}
          <Icon width="30" height="30" icon={moveIcon} />
        </button>
        {isOpen && (
          <ModalPicturesPage
            id={elem.priority}
            // largeImageURL={elem.large_image}
            onClose={this.handleOnModal}
          >
            <img src={elem.large_image} alt="img" />
          </ModalPicturesPage>
        )}
      </div>
    );
  }
}

export default PhotoCard;
