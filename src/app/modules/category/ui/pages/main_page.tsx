import React from "react";
import { Route, Switch } from "react-router-dom";

import { Routing } from "../../../../core/routing";
import { ROUTES } from "../../../../routes";
import { CategoryCreatePage } from "./create_page";
import { CategoryDetailPage } from "./detail_page";
import { CategoryEditPage } from "./edit_page";
import { CategoryListPage } from "./list_page";

export const CategoryMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.category} exact>
        <CategoryListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.category)}>
        <CategoryCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.category)}>
        <CategoryEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.category)}>
        <CategoryDetailPage />
      </Route>
    </Switch>
  );
};
