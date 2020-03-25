import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "../../routes/routes";
import HomePage from "../Page/HomePage";
import CategoryProduct from "../CategoryProduct/CategoryProduct";
import AboutPage from "../AboutPage/AboutPage";
import IntegralPage from "../IntegralPage/IntegralPage";
// import ProductDetails from "../ProductDetails/ProductDetails";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <IntegralPage />
        <Switch>
          <Route exact path={routes.MAIN} component={HomePage} />
          <Route exact path={routes.ABOUT} component={AboutPage} />
          {/* <Route path={routes.PRODUCTS_DITEILS} component={ProductDetails} /> */}
          <Route exact path={routes.PRODUCTS} component={CategoryProduct} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
