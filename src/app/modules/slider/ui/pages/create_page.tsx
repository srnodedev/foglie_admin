import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { ISliderForm } from "../../data/entities";
import { SliderForm } from "../components/form";
import { sliderReduxActions } from "../state/state";

export const SliderCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: ISliderForm): Promise<void> => {
    await dispatch(sliderReduxActions.create(values));
    history.push(ROUTES.slider);
  };

  const createSliderBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.slider.create);

  return <SliderForm branch={createSliderBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
