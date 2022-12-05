import { Action, applyMiddleware, combineReducers, createStore, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";

import { AboutReducers, IAboutReduxState } from "../modules/about/ui/state/state";
import { AuthenticationReducers, IAuthenticationReduxState } from "../modules/auth/ui/state/state";
import { CategoryReducers, ICategoryReduxState } from "../modules/category/ui/state/state";
import { FileReducers, IFileReduxState } from "../modules/file/ui/state/state";
import { IMemberReduxState, MemberReducers } from "../modules/members/ui/state/state";
import { IPostReduxState, PostReducers } from "../modules/post/ui/state/state";
import { IPricingReduxState, PricingReducers } from "../modules/pricing/ui/state/state";
import { IProfileReduxState, ProfileReducers } from "../modules/profile/ui/state/state";
import { IProjectReduxState, ProjectReducers } from "../modules/project/ui/state/state";
import { ISliderReduxState, SliderReducers } from "../modules/slider/ui/state/state";
import { IUserReduxState, UserReducers } from "../modules/user/ui/state/state";
import { confirmationMiddleware, reduxPromiseMiddleware } from "./middlewares";

export interface IAppReduxState {
  auth: IAuthenticationReduxState;
  user: IUserReduxState;
  profile: IProfileReduxState;
  members: IMemberReduxState;
  category: ICategoryReduxState;
  post: IPostReduxState;
  project: IProjectReduxState;
  about: IAboutReduxState;
  pricing: IPricingReduxState;
  slider: ISliderReduxState;
  file: IFileReduxState;
}

export function getRootReducer(): Reducer<IAppReduxState> {
  const reducersList = {
    auth: AuthenticationReducers,
    user: UserReducers,
    profile: ProfileReducers,
    members: MemberReducers,
    category: CategoryReducers,
    post: PostReducers,
    project: ProjectReducers,
    about: AboutReducers,
    pricing: PricingReducers,
    slider: SliderReducers,
    file: FileReducers,
  };

  return combineReducers<IAppReduxState>(reducersList);
}

export const store = createStore(
  getRootReducer(),
  composeWithDevTools(applyMiddleware(thunk, reduxPromiseMiddleware, confirmationMiddleware)),
);

export type ReduxDispatch = ThunkDispatch<IAppReduxState, any, Action>;
