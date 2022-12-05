import { combineReducers } from "redux";

import {
  generateCrudActionTypes,
  generateCrudReducers,
  generateCrudReduxActionCreators,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  ICRUDReduxState,
} from "../../../../core/redux";
import { IProject, IProjectForm } from "../../data/entities";
import { ProjectRepoImpl } from "../../data/repo";

const moduleName = "Project";

interface IProjectActionTypes extends ICRUDActionTypes {}

const actionTypes: IProjectActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface IProjectActionCreators extends ICrudReduxActionCreators<IProject, IProjectForm> {}

export const projectReduxActions: IProjectActionCreators = {
  ...generateCrudReduxActionCreators<IProject, IProjectForm>({ actionTypes, repository: ProjectRepoImpl }),
};

export interface IProjectReduxState extends ICRUDReduxState<IProject> {}

export const ProjectReducers = combineReducers<IProjectReduxState>({
  ...generateCrudReducers<IProject>(actionTypes),
});
