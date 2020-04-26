import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import stylish from "./App.module.css";
import routes from "../../routes/routes";
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
            <Route exact path={routes.HOME} component={IntegralPage} />
            <Route exact path={routes.ABOUT} component={AboutPage} />
            <Route
              path={`${routes.PRODUCTS}/:categorynum`}
              component={IntegralViewCategoryProducts}
            />
            <Route
              path={`${routes.PRODUCT_CODE}/:someIDproduct`}
              component={IntegralProduct_CodeDetails}
            />
            <Route
              path={`${routes.PRODUCT}:someIDproduct`}
              component={IntegralProductDetails}
            />
            <Redirect to={routes.HOME} />
          </Switch>
        </div>
        <FooterPage />
      </BrowserRouter>
    );
  }
}

export default App;
