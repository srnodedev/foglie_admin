import { combineReducers } from "redux";

import {
  generateCrudActionTypes,
  generateCrudReducers,
  generateCrudReduxActionCreators,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  ICRUDReduxState,
} from "../../../../core/redux";
import { ISlider, ISliderForm } from "../../data/entities";
import { SliderRepoImpl } from "../../data/repo";

const moduleName = "Slider";

interface ISliderActionTypes extends ICRUDActionTypes {}

const actionTypes: ISliderActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface ISliderActionCreators extends ICrudReduxActionCreators<ISlider, ISliderForm> {}

export const sliderReduxActions: ISliderActionCreators = {
  ...generateCrudReduxActionCreators<ISlider, ISliderForm>({ actionTypes, repository: SliderRepoImpl }),
};

export interface ISliderReduxState extends ICRUDReduxState<ISlider> {}

export const SliderReducers = combineReducers<ISliderReduxState>({
  ...generateCrudReducers<ISlider>(actionTypes),
});
