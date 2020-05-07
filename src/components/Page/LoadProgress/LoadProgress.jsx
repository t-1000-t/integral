import React, { Component } from "react";

class LoadProgress extends Component {
  state = {
    progress: 0,
    countLimit: 0,
    isOpen: true,
    color: "#4caf50",
  };

  green() {
    let progress = this.state.progress;
    progress *= 2.55;
    progress = Math.round(progress);
    progress = progress.toString(16);
    return progress;
  }
  red() {
    let progress = this.state.progress;
    progress *= 2.55;
    progress = Math.round(progress);
    progress = 255 - progress;
    progress = progress.toString(16);
    return progress;
  }

  componentDidMount() {
    this.frame();
  }

  componentDidUpdate() {
    if (this.state.countLimit < this.props.count) {
      this.frame();
    }
    if (this.state.countLimit > this.props.count && this.state.isOpen) {
      console.log("ok 2");
      this.frameFinish();
      this.setState({
        isOpen: false,
      });
    }
  }

  frameFinish = () => {
    const lastLimit = this.props.count - this.state.countLimit;
    console.log("lastLimit", lastLimit);
    const percentageFinish = ((lastLimit / this.props.count) * 100).toFixed();
    console.log("percentageFinish", percentageFinish);
    console.log("this.state.countLimit 2", this.state.countLimit);
    this.setState({
      progress: Number(percentageFinish) + Number(this.state.progress),
    });
  };

  frame = () => {
    const { count, limitNum } = this.props;
    this.setState((prevState) => ({
      countLimit: prevState.countLimit + limitNum,
    }));

    const percentage = ((limitNum / count) * 100).toFixed();

    if (this.state.countLimit <= count) {
      this.setState({
        progress: Number(percentage) + Number(this.state.progress),
      });
    }

    console.log("this.state.countLimit", this.state.countLimit);
    console.log("this.state.progress", this.state.progress);
    console.log("this.props.count", count);
    console.log("this.props.limitNum", limitNum);
  };

  render() {
    const { progress, color } = this.state;
    const styleMyBar = {
      width: progress + "%",
      borderRadius: "5px",
      backgroundColor: color,
    };

    return (
      <div id="myBar" style={styleMyBar}>
        <div id="label">&nbsp; Loaded {this.state.progress}%</div>
      </div>
    );
  }
}

export default LoadProgress;
