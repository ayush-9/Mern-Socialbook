import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import SignUpPage from "./components/signup/SignUpPage";
import SignInPage from "./components/signin/SignInPage";
import Home from "./components/page/Home";
function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={SignUpPage} />
        <Route exact path="/signup/" component={SignUpPage} />
        <Route exact path="/signin/" component={SignInPage} />
        <Route exact path="/home/" component={Home} />
      </Switch>
    </Fragment>
  );
}

export default App;
