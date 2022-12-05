import React from "react";
import { Route, Switch } from "react-router-dom";

import { Routing } from "../../../../core/routing";
import { ROUTES } from "../../../../routes";
import { ProjectCreatePage } from "./create_page";
import { ProjectDetailPage } from "./detail_page";
import { ProjectEditPage } from "./edit_page";
import { ProjectListPage } from "./list_page";

export const ProjectMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.project} exact>
        <ProjectListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.project)}>
        <ProjectCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.project)}>
        <ProjectEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.project)}>
        <ProjectDetailPage />
      </Route>
    </Switch>
  );
};
