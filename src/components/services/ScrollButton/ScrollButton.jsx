import React, { Component, createRef } from "react";
import stylish from "./ScrollButton.module.css";
import { Icon } from "@iconify/react";
import playBackOutline from "@iconify/icons-ion/play-back-outline";

class ScrollButton extends Component {
  state = {
    intervalId: 0,
    yScrollSet: 0,
    isShowBtn: false,
  };

  btnTopRef = createRef();

  componentDidMount() {
    window.addEventListener("scroll", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.type !== "scroll") {
      return;
    }
    if (e.SCROLL_PAGE_UP) {
      this.setState({
        isShowBtn: true,
      });
    }
    setTimeout(() => {
      this.setState({
        isShowBtn: false,
      });
    }, 6000);
  };

  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - 50);
  };

  scrollToTop = () => {
    let intervalId = setInterval(() => {
      this.scrollStep();
    }, 16.66);
    this.setState({ intervalId: intervalId });
  };

  render() {
    const { isShowBtn } = this.state;
    console.log(this.props.ulListRef);
    console.log(this.btnTopRef);
    return (
      <>
        {isShowBtn && (
          <button
            ref={this.btnTopRef}
            title="Back to top"
            className={stylish.scroll}
            onClick={() => {
              this.scrollToTop();
            }}
          >
            <Icon
              icon={playBackOutline}
              rotate="90deg"
              width="20"
              height="20"
            />
            <span className={stylish.arrowUp}></span>
          </button>
        )}
      </>
    );
  }
}

export default ScrollButton;
