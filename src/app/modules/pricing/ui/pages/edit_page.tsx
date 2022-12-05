import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { Routing } from "../../../../core/routing";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IPricing, IPricingForm, pricingEditFormValidation } from "../../data/entities";
import { PricingForm } from "../components/form";
import { pricingReduxActions } from "../state/state";

export const PricingEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const pricingDetailBranch = useSelector<IAppReduxState, IAsyncData<IPricing>>((state) => state.pricing.details);
  const editPricingBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.pricing.edit);

  useEffect(() => {
    dispatch(pricingReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IPricingForm): Promise<void> => {
    await dispatch(pricingReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.pricing, id));
  };

  return (
    <PricingForm
      initialData={pricingDetailBranch}
      onSubmit={onSubmit}
      branch={editPricingBranch}
      validationSchema={pricingEditFormValidation}
      submitTitle="Edit"
    />
  );
};
