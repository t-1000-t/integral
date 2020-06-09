import React, { Component } from "react";

import stylish from "./FilterCategoryName.module.css";

class FilterCategoryName extends Component {
  state = {
    isOpenFilterElem: false,
  };

  toggleOpenFilterElem = () => {
    this.setState({
      isOpenFilterElem: !this.state.isOpenFilterElem,
    });
  };

  render() {
    const { isOpenFilterElem } = this.state;
    const { elem, updateElemStatus } = this.props;
    return ( 
      <>
        <p className={stylish.checkboxName} onClick={this.toggleOpenFilterElem}>
          {elem.name}
        </p>
        <>
          {isOpenFilterElem &&
            elem.filters.map((item) => (
              <div key={item.filterID} className={stylish.checkBoxList}>
                <p className={stylish.checkboxNametwo}>{item.name}</p>

                <input
                  type="checkbox"
                  className={stylish.checkbox}
                  checked={item.completed}
                  onChange={() => updateElemStatus(item.filterID)}
                />
              </div>
            ))}
        </>
      </>
    );
  }
}

export default FilterCategoryName;
