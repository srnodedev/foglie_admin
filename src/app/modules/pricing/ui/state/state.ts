import { combineReducers } from "redux";

import {
  generateCrudActionTypes,
  generateCrudReducers,
  generateCrudReduxActionCreators,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  ICRUDReduxState,
} from "../../../../core/redux";
import { IPricing, IPricingForm } from "../../data/entities";
import { PricingRepoImpl } from "../../data/repo";

const moduleName = "Pricing";

interface IPricingActionTypes extends ICRUDActionTypes {}

const actionTypes: IPricingActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface IPricingActionCreators extends ICrudReduxActionCreators<IPricing, IPricingForm> {}

export const pricingReduxActions: IPricingActionCreators = {
  ...generateCrudReduxActionCreators<IPricing, IPricingForm>({ actionTypes, repository: PricingRepoImpl }),
};

export interface IPricingReduxState extends ICRUDReduxState<IPricing> {}

export const PricingReducers = combineReducers<IPricingReduxState>({
  ...generateCrudReducers<IPricing>(actionTypes),
});
