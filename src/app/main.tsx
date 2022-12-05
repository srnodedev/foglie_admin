import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { LoadingScreen } from "./components/loading_screen";
import { IAsyncData } from "./core/models";
import { isLoading } from "./core/redux";
import { Layout } from "./layout";
import { AboutMainPage } from "./modules/about/ui/pages/main_page";
import { LoginPage } from "./modules/auth/ui/pages/login_page";
import { authRedux } from "./modules/auth/ui/state/state";
import { CategoryMainPage } from "./modules/category/ui/pages/main_page";
import { FileMainPage } from "./modules/file/ui/pages/main_page";
import { MemberMainPage } from "./modules/members/ui/pages/main_page";
import { PostMainPage } from "./modules/post/ui/pages/main_page";
import { PricingMainPage } from "./modules/pricing/ui/pages/main_page";
import { ProfileMainPage } from "./modules/profile/ui/pages/main_page";
import { ProjectMainPage } from "./modules/project/ui/pages/main_page";
import { SliderMainPage } from "./modules/slider/ui/pages/main_page";
import { UserMainPage } from "./modules/user/ui/pages/main_page";
import { IAppReduxState } from "./redux/store";
import { ROUTES } from "./routes";

export const Main: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRedux.actions.checkAuth());
  }, [dispatch]);

  const isLoggedInBranch = useSelector<IAppReduxState, IAsyncData<boolean>>((state) => state.auth.isLoggedIn);
  const loading = isLoading(isLoggedInBranch);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : isLoggedInBranch.data ? (
        <Layout>
          <Switch>
            <Route path={ROUTES.file}>
              <FileMainPage />
            </Route>

            <Route path={ROUTES.user}>
              <UserMainPage />
            </Route>

            <Route path={ROUTES.profile}>
              <ProfileMainPage />
            </Route>

            <Route path={ROUTES.members}>
              <MemberMainPage />
            </Route>

            <Route path={ROUTES.category}>
              <CategoryMainPage />
            </Route>

            <Route path={ROUTES.post}>
              <PostMainPage />
            </Route>

            <Route path={ROUTES.project}>
              <ProjectMainPage />
            </Route>

            <Route path={ROUTES.about}>
              <AboutMainPage />
            </Route>

            <Route path={ROUTES.pricing}>
              <PricingMainPage />
            </Route>

            <Route path={ROUTES.slider}>
              <SliderMainPage />
            </Route>

            <Route path="*">
              <Redirect to={ROUTES.about} />
            </Route>
          </Switch>
        </Layout>
      ) : (
        <Switch>
          <Route path={ROUTES.login}>
            <LoginPage />
          </Route>
          <Route path="*">
            <Redirect to={ROUTES.login} />
          </Route>
        </Switch>
      )}
    </div>
  );
};
