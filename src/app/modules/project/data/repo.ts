import { ApiClient, apiClient } from "../../../core/api_client";
import { generateCrudRepoFactory } from "../../../core/crud";
import { ICRUDRepo } from "../../../core/models";
import { IProject, IProjectForm, projectFromJson, projectToJson } from "./entities";

interface IProjectRepo extends ICRUDRepo<IProject, IProjectForm> {}

const URL = "v1/projects";

const ProjectRepoImplFactory = (apiClient: ApiClient): IProjectRepo => {
  const r: IProjectRepo = {
    ...generateCrudRepoFactory<IProject, IProjectForm>(apiClient, URL, projectFromJson, projectToJson),
  };

  return r;
};

export const ProjectRepoImpl = ProjectRepoImplFactory(apiClient);
