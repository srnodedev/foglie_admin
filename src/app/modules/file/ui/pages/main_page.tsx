import React from "react";
import { Route, Switch } from "react-router-dom";

import { Routing } from "../../../../core/routing";
import { ROUTES } from "../../../../routes";
import { FileCreatePage } from "./create_page";
import { FileDetailPage } from "./detail_page";
import { FileEditPage } from "./edit_page";
import { FileListPage } from "./list_page";

export const FileMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.file} exact>
        <FileListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.file)}>
        <FileCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.file)}>
        <FileEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.file)}>
        <FileDetailPage />
      </Route>
    </Switch>
  );
};
