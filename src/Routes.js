import React from "react";
import { Route, Switch } from "react-router-dom";

import Site from "./Site";
import Trends from "./Trends";

export default () =>
  <Switch>
    <Route path="/site" exact component={Site} />
    <Route path="/trends" exact component={Trends} />
  </Switch>;