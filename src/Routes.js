import React from "react";
import { Route, Switch } from "react-router-dom";

import Contributions from "./contributions/Contributions";

export default () =>
  <Switch>
    <Route
        path="/visualizations"
        component={() =>
            window.location = "http://coa-superset-prod.eba-b9cczgua.us-east-1.elasticbeanstalk.com/superset/dashboard/coa-ui/?preselect_filters=%7B%221%22%3A%20%7B%22__time_range%22%3A%20%22No%20filter%22%7D%7D"
        }
    />
    <Route
        path="/about"
        component={() =>
            window.location = "http://www.cleanoceanaction.org/index.php?id=2"
        }
    />
    <Route path="/contributions" exact component={Contributions} />
  </Switch>;
