import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "../../routes/routes";
import HomePage from "../Page/HomePage";
import Categories from "../Categories/Categories";
import AboutPage from "../AboutPage/AboutPage";
import widthResize from "../../services/widthResize";
import NavigationPage from "../NavigationPage/NavigationPage";
import PresentPage from "../PresentPage/PresentPage";
import IntegralPage from "../Page/IntegralPage/IntegralPage";

class App extends Component {
  componentDidMount() {
    widthResize();
  }

  render() {
    return (
      <BrowserRouter>
        <NavigationPage />
        <Switch>
          <Route exact path={routes.HOME} component={IntegralPage} />
          <Route exact path={routes.MAIN} component={HomePage} />
          <Route exact path={routes.ABOUT} component={AboutPage} />
          <Route exact path={routes.PRODUCTS} component={Categories} />
          <Redirect to={routes.MAIN} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
