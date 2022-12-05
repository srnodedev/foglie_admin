import React from "react";
import { Route, Switch } from "react-router-dom";

import { Routing } from "../../../../core/routing";
import { ROUTES } from "../../../../routes";
import { PostCreatePage } from "./create_page";
import { PostDetailPage } from "./detail_page";
import { PostEditPage } from "./edit_page";
import { PostListPage } from "./list_page";

export const PostMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.post} exact>
        <PostListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.post)}>
        <PostCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.post)}>
        <PostEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.post)}>
        <PostDetailPage />
      </Route>
    </Switch>
  );
};
