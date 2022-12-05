import { combineReducers } from "redux";

import {
  generateCrudActionTypes,
  generateCrudReducers,
  generateCrudReduxActionCreators,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  ICRUDReduxState,
} from "../../../../core/redux";
import { IAbout, IAboutForm } from "../../data/entities";
import { AboutRepoImpl } from "../../data/repo";

const moduleName = "About";

interface IAboutActionTypes extends ICRUDActionTypes {}

const actionTypes: IAboutActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface IAboutActionCreators extends ICrudReduxActionCreators<IAbout, IAboutForm> {}

export const aboutReduxActions: IAboutActionCreators = {
  ...generateCrudReduxActionCreators<IAbout, IAboutForm>({ actionTypes, repository: AboutRepoImpl }),
};

export interface IAboutReduxState extends ICRUDReduxState<IAbout> {}

export const AboutReducers = combineReducers<IAboutReduxState>({
  ...generateCrudReducers<IAbout>(actionTypes),
});
