import { combineReducers } from "redux";

import { IAsyncData } from "../../../../core/models";
import { asyncItemReducerGenerator, IAsyncReduxAction } from "../../../../core/redux";
import { ILoginForm } from "../../data/entites";
import { AuthRepoImpl } from "../../data/repo";

enum EAuthenticationActionType {
  IS_LOGGED_IN = "IS_LOGGED_IN",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface IAuthenticationReduxState {
  isLoggedIn: IAsyncData<boolean>;
  login: IAsyncData<void>;
  logout: IAsyncData<void>;
}

const checkAuthState = (): IAsyncReduxAction<boolean> => ({
  type: EAuthenticationActionType.IS_LOGGED_IN,
  payload: AuthRepoImpl.isLoggedIn(),
});

const loginAction = (param: ILoginForm): IAsyncReduxAction<void> => ({
  type: EAuthenticationActionType.LOGIN,
  payload: AuthRepoImpl.login(param),
});

const logoutAction = (): IAsyncReduxAction<void> => ({
  type: EAuthenticationActionType.LOGOUT,
  payload: AuthRepoImpl.logout(),
});

const checkAuthReducer = asyncItemReducerGenerator<boolean>(EAuthenticationActionType.IS_LOGGED_IN);
export const loginReducer = asyncItemReducerGenerator<void>(EAuthenticationActionType.LOGIN);
export const logoutReducer = asyncItemReducerGenerator<void>(EAuthenticationActionType.LOGOUT);

export const authRedux = {
  actions: {
    checkAuth: checkAuthState,
    login: loginAction,
    logout: logoutAction,
  },
  reducers: {
    login: loginReducer,
    logout: logoutReducer,
    isLoggedIn: checkAuthReducer,
  },
};

export const AuthenticationReducers = combineReducers<IAuthenticationReduxState>({
  ...authRedux.reducers,
});
