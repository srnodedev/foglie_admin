import React from "react";
import { Route, Switch } from "react-router-dom";

import { Routing } from "../../../../core/routing";
import { ROUTES } from "../../../../routes";
import { PricingCreatePage } from "./create_page";
import { PricingDetailPage } from "./detail_page";
import { PricingEditPage } from "./edit_page";
import { PricingListPage } from "./list_page";

export const PricingMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.pricing} exact>
        <PricingListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.pricing)}>
        <PricingCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.pricing)}>
        <PricingEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.pricing)}>
        <PricingDetailPage />
      </Route>
    </Switch>
  );
};
