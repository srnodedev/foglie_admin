import { ApiClient, apiClient } from "../../../core/api_client";
import { generateCrudRepoFactory } from "../../../core/crud";
import { ICRUDRepo } from "../../../core/models";
import { aboutFromJson, aboutToJson, IAbout, IAboutForm } from "./entities";

interface IAboutRepo extends ICRUDRepo<IAbout, IAboutForm> {}

const URL = "v1/about";

const AboutRepoImplFactory = (apiClient: ApiClient): IAboutRepo => {
  const r: IAboutRepo = {
    ...generateCrudRepoFactory<IAbout, IAboutForm>(apiClient, URL, aboutFromJson, aboutToJson),
  };

  return r;
};

export const AboutRepoImpl = AboutRepoImplFactory(apiClient);
