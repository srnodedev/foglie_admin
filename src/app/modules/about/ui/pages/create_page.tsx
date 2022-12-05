import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IAboutForm } from "../../data/entities";
import { AboutForm } from "../components/form";
import { aboutReduxActions } from "../state/state";

export const AboutCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IAboutForm): Promise<void> => {
    await dispatch(aboutReduxActions.create(values));
    history.push(ROUTES.about);
  };

  const createAboutBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.about.create);

  return <AboutForm branch={createAboutBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
