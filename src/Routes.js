import React from "react";
import { Route, Switch } from "react-router-dom";

import Contributions from "./contributions/Contributions";

export default () =>
  <Switch>
    <Route path="/contributions" exact component={Contributions} />
  </Switch>;
