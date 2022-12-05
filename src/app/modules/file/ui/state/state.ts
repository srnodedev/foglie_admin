import { combineReducers } from "redux";

import {
  generateCrudActionTypes,
  generateCrudReducers,
  generateCrudReduxActionCreators,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  ICRUDReduxState,
} from "../../../../core/redux";
import { IFile, IFileForm } from "../../data/entities";
import { FileRepoImpl } from "../../data/repo";

const moduleName = "File";

interface IFileActionTypes extends ICRUDActionTypes {}

const actionTypes: IFileActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface IFileActionCreators extends ICrudReduxActionCreators<IFile, IFileForm> {}

export const fileReduxActions: IFileActionCreators = {
  ...generateCrudReduxActionCreators<IFile, IFileForm>({ actionTypes, repository: FileRepoImpl }),
};

export interface IFileReduxState extends ICRUDReduxState<IFile> {}

export const FileReducers = combineReducers<IFileReduxState>({
  ...generateCrudReducers<IFile>(actionTypes),
});
