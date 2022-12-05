import { ApiClient, apiClient } from "../../../core/api_client";
import { generateCrudRepoFactory } from "../../../core/crud";
import { ICRUDRepo } from "../../../core/models";
import { ISlider, ISliderForm, sliderFromJson, sliderToJson } from "./entities";

interface ISliderRepo extends ICRUDRepo<ISlider, ISliderForm> {}

const URL = "v1/slider";

const SliderRepoImplFactory = (apiClient: ApiClient): ISliderRepo => {
  const r: ISliderRepo = {
    ...generateCrudRepoFactory<ISlider, ISliderForm>(apiClient, URL, sliderFromJson, sliderToJson),
  };

  return r;
};

export const SliderRepoImpl = SliderRepoImplFactory(apiClient);
