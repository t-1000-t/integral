import React, { Component } from "react";
import stylish from "./ScrollButton.module.css";
import { Icon } from "@iconify/react";
import playBackOutline from "@iconify/icons-ion/play-back-outline";

class ScrollButton extends Component {
  state = {
    intervalId: 0,
    yScrollSet: 0,
    isShowBtn: false,
  };

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

    window.pageYOffset !== 0
      ? this.setState({
          isShowBtn: true,
        })
      : this.setState({
          isShowBtn: false,
        });
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
    return (
      <>
        {isShowBtn && (
          <button
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
