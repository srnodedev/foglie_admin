import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { Routing } from "../../../../core/routing";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { ISlider, ISliderForm, sliderEditFormValidation } from "../../data/entities";
import { SliderForm } from "../components/form";
import { sliderReduxActions } from "../state/state";

export const SliderEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const sliderDetailBranch = useSelector<IAppReduxState, IAsyncData<ISlider>>((state) => state.slider.details);
  const editSliderBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.slider.edit);

  useEffect(() => {
    dispatch(sliderReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: ISliderForm): Promise<void> => {
    await dispatch(sliderReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.slider, id));
  };

  return (
    <SliderForm
      initialData={sliderDetailBranch}
      onSubmit={onSubmit}
      branch={editSliderBranch}
      validationSchema={sliderEditFormValidation}
      submitTitle="Edit"
    />
  );
};
