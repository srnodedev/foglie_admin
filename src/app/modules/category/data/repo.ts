import { ApiClient, apiClient } from "../../../core/api_client";
import { generateCrudRepoFactory } from "../../../core/crud";
import { ICRUDRepo } from "../../../core/models";
import { categoryFromJson, categoryToJson, ICategory, ICategoryForm } from "./entities";

interface ICategoryRepo extends ICRUDRepo<ICategory, ICategoryForm> {}

const URL = "v1/categories";

const CategoryRepoImplFactory = (apiClient: ApiClient): ICategoryRepo => {
  const r: ICategoryRepo = {
    ...generateCrudRepoFactory<ICategory, ICategoryForm>(apiClient, URL, categoryFromJson, categoryToJson),
  };

  return r;
};

export const CategoryRepoImpl = CategoryRepoImplFactory(apiClient);
