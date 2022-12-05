import { combineReducers } from "redux";

import {
  generateCrudActionTypes,
  generateCrudReducers,
  generateCrudReduxActionCreators,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  ICRUDReduxState,
} from "../../../../core/redux";
import { ICategory, ICategoryForm } from "../../data/entities";
import { CategoryRepoImpl } from "../../data/repo";

const moduleName = "Category";

interface ICategoryActionTypes extends ICRUDActionTypes {}

const actionTypes: ICategoryActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface ICategoryActionCreators extends ICrudReduxActionCreators<ICategory, ICategoryForm> {}

export const categoryReduxActions: ICategoryActionCreators = {
  ...generateCrudReduxActionCreators<ICategory, ICategoryForm>({ actionTypes, repository: CategoryRepoImpl }),
};

export interface ICategoryReduxState extends ICRUDReduxState<ICategory> {}

export const CategoryReducers = combineReducers<ICategoryReduxState>({
  ...generateCrudReducers<ICategory>(actionTypes),
});
