import { ApiClient, apiClient } from "../../../core/api_client";
import { Failure } from "../../../core/failure";
import { IPasswordForm } from "./entities";

interface IProfileRepo {
  changePassword: (form: IPasswordForm) => Promise<void>;
}

const ProfileRepoImplFactory = (apiClient: ApiClient): IProfileRepo => {
  const r: IProfileRepo = {
    changePassword: async (form) => {
      try {
        await apiClient.post("v1/auth/change-password", form);
      } catch (error) {
        const failure: Failure = {
          message: error.message ?? "Unhandled failure",
        };

        throw failure;
      }
    },
  };

  return r;
};

export const ProfileRepoImpl = ProfileRepoImplFactory(apiClient);
