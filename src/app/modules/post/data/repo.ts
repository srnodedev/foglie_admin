import { ApiClient, apiClient } from "../../../core/api_client";
import { generateCrudRepoFactory } from "../../../core/crud";
import { ICRUDRepo } from "../../../core/models";
import { IPost, IPostForm, postFromJson, postToJson } from "./entities";

interface IPostRepo extends ICRUDRepo<IPost, IPostForm> {}

const URL = "v1/posts";

const PostRepoImplFactory = (apiClient: ApiClient): IPostRepo => {
  const r: IPostRepo = {
    ...generateCrudRepoFactory<IPost, IPostForm>(apiClient, URL, postFromJson, postToJson),
  };

  return r;
};

export const PostRepoImpl = PostRepoImplFactory(apiClient);
