import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "../../routes/routes";
import HomePage from "../Page/HomePage";
import Categories from "../Categories/Categories";
import AboutPage from "../AboutPage/AboutPage";
import IntegralPage from "../IntegralPage/IntegralPage";
import PresentPage from "../PresentPage/PresentPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <IntegralPage />
        <Switch>
          <Route exact path={routes.HOME} component={PresentPage} />
          <Route exact path={routes.MAIN} component={HomePage} />
          <Route exact path={routes.ABOUT} component={AboutPage} />
          <Route exact path={routes.PRODUCTS} component={Categories} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
