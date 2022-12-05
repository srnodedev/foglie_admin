import { ApiClient, apiClient } from "../../../core/api_client";
import { generateCrudRepoFactory } from "../../../core/crud";
import { ICRUDRepo } from "../../../core/models";
import { fileFromJson, fileToJson, IFile, IFileForm } from "./entities";

interface IFileRepo extends ICRUDRepo<IFile, IFileForm> {}

const URL = "v1/files";

const FileRepoImplFactory = (apiClient: ApiClient): IFileRepo => {
  const r: IFileRepo = {
    ...generateCrudRepoFactory<IFile, IFileForm>(apiClient, URL, fileFromJson, fileToJson, true),
  };

  return r;
};

export const FileRepoImpl = FileRepoImplFactory(apiClient);
