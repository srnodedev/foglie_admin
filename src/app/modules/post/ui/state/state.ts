import { combineReducers } from "redux";

import {
  generateCrudActionTypes,
  generateCrudReducers,
  generateCrudReduxActionCreators,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  ICRUDReduxState,
} from "../../../../core/redux";
import { IPost, IPostForm } from "../../data/entities";
import { PostRepoImpl } from "../../data/repo";

const moduleName = "Post";

interface IPostActionTypes extends ICRUDActionTypes {}

const actionTypes: IPostActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface IPostActionCreators extends ICrudReduxActionCreators<IPost, IPostForm> {}

export const postReduxActions: IPostActionCreators = {
  ...generateCrudReduxActionCreators<IPost, IPostForm>({ actionTypes, repository: PostRepoImpl }),
};

export interface IPostReduxState extends ICRUDReduxState<IPost> {}

export const PostReducers = combineReducers<IPostReduxState>({
  ...generateCrudReducers<IPost>(actionTypes),
});
