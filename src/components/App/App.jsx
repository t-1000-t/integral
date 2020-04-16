import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import stylish from "./App.module.css";
// import widthResize from "../services/widthResize";
import NavigationPage from "../Page/NavigationPage/NavigationPage";
import AboutPage from "../Page/AboutPage/AboutPage";
import FooterPage from "../Page/FooterPage/FooterPage";
import IntegralPage from "../Page/IntegralPage/IntegralPage";
import IntegralViewCategoryProducts from "../Page/IntegralViewCategoryProducts/IntegralViewCategoryProducts";
import IntegralProductDetails from "../Page/IntegralProductDetails/IntegralProductDetails";
import IntegralProduct_CodeDetails from "../Page/IntegralProduct_CodeDetails/IntegralProduct_CodeDetails";

class App extends Component {
  componentDidMount() {
    // widthResize();
  }
  render() {
    return (
      <BrowserRouter>
        <NavigationPage />

        <div className={stylish.container}>
          <Switch>
            <Route exact path="/" component={IntegralPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route path="/products" component={IntegralViewCategoryProducts} />
            <Route
              path="/product/product_code/:someIDproduct"
              component={IntegralProduct_CodeDetails}
            />
            <Route
              path="/product/:someIDproduct"
              component={IntegralProductDetails}
            />
            <Redirect to="/" />
          </Switch>
        </div>
        <FooterPage />
      </BrowserRouter>
    );
  }
}

export default App;
