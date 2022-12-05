import React from "react";
import { Route, Switch } from "react-router-dom";

import { Routing } from "../../../../core/routing";
import { ROUTES } from "../../../../routes";
import { AboutCreatePage } from "./create_page";
import { AboutDetailPage } from "./detail_page";
import { AboutEditPage } from "./edit_page";
import { AboutListPage } from "./list_page";

export const AboutMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.about} exact>
        <AboutListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.about)}>
        <AboutCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.about)}>
        <AboutEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.about)}>
        <AboutDetailPage />
      </Route>
    </Switch>
  );
};
