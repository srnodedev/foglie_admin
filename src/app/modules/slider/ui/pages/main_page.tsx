import React from "react";
import { Route, Switch } from "react-router-dom";

import { Routing } from "../../../../core/routing";
import { ROUTES } from "../../../../routes";
import { SliderCreatePage } from "./create_page";
import { SliderDetailPage } from "./detail_page";
import { SliderEditPage } from "./edit_page";
import { SliderListPage } from "./list_page";

export const SliderMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.slider} exact>
        <SliderListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.slider)}>
        <SliderCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.slider)}>
        <SliderEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.slider)}>
        <SliderDetailPage />
      </Route>
    </Switch>
  );
};
