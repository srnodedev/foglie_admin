import { ApiClient, apiClient } from "../../../core/api_client";
import { generateCrudRepoFactory } from "../../../core/crud";
import { ICRUDRepo } from "../../../core/models";
import { IMember, IMemberForm, memberFromJson, memberToJson } from "./entities";

interface IMemberRepo extends ICRUDRepo<IMember, IMemberForm> {}

const URL = "v1/members";

const MemberRepoImplFactory = (apiClient: ApiClient): IMemberRepo => {
  const r: IMemberRepo = {
    ...generateCrudRepoFactory<IMember, IMemberForm>(apiClient, URL, memberFromJson, memberToJson),
  };

  return r;
};

export const MemberRepoImpl = MemberRepoImplFactory(apiClient);
