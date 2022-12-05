import { ApiClient, apiClient } from "../../../core/api_client";
import { generateCrudRepoFactory } from "../../../core/crud";
import { ICRUDRepo } from "../../../core/models";
import { IPricing, IPricingForm, pricingFromJson, pricingToJson } from "./entities";

interface IPricingRepo extends ICRUDRepo<IPricing, IPricingForm> {}

const URL = "v1/pricings";

const PricingRepoImplFactory = (apiClient: ApiClient): IPricingRepo => {
  const r: IPricingRepo = {
    ...generateCrudRepoFactory<IPricing, IPricingForm>(apiClient, URL, pricingFromJson, pricingToJson),
  };

  return r;
};

export const PricingRepoImpl = PricingRepoImplFactory(apiClient);
