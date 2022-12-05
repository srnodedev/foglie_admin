import { ApiClient, apiClient } from "../../../core/api_client";
import { generateCrudRepoFactory } from "../../../core/crud";
import { ICRUDRepo } from "../../../core/models";
import { IUser, IUserForm, userFromJson, userToJson } from "./entities";

interface IUserRepo extends ICRUDRepo<IUser, IUserForm> {}

const URL = "v1/user";

const UserRepoImplFactory = (apiClient: ApiClient): IUserRepo => {
  const r: IUserRepo = {
    ...generateCrudRepoFactory<IUser, IUserForm>(apiClient, URL, userFromJson, userToJson),
  };

  return r;
};

export const UserRepoImpl = UserRepoImplFactory(apiClient);
