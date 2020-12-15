import React from "react";
import { Route, Switch } from "react-router-dom";

import Contributions from "./contributions/Contributions";

export default () =>
  <Switch>
    <Route path="/contributions" exact component={Contributions} />
    <Route path="/about" component={() => window.location = "http://www.cleanoceanaction.org/index.php?id=2"}/>
  </Switch>;