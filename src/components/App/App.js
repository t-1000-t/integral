import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavigationPage from "../Page/NavigationPage/NavigationPage";
import IntegralPage from "../Page/IntegralPage/IntegralPage";
import Test from "../Page/Test/Test";
import IntegralViewCategoryProducts from "../Page/IntegralViewCategoryProducts/IntegralViewCategoryProducts";
import IntegralProductDetails from "../Page/IntegralProductDetails/IntegralProductDetails";

const App = () => (
  <BrowserRouter>
    <NavigationPage />

    <div className="App">
      <Switch>
        <Route exact path="/" component={IntegralPage} />
        <Route path="/products" component={IntegralViewCategoryProducts} />
        <Route
          path="/product/:someIDproduct"
          component={IntegralProductDetails}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
