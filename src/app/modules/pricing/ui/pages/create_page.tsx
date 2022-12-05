import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IPricingForm } from "../../data/entities";
import { PricingForm } from "../components/form";
import { pricingReduxActions } from "../state/state";

export const PricingCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IPricingForm): Promise<void> => {
    await dispatch(pricingReduxActions.create(values));
    history.push(ROUTES.pricing);
  };

  const createPricingBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.pricing.create);

  return <PricingForm branch={createPricingBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
