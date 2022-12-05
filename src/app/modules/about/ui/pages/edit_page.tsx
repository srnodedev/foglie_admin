import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { Routing } from "../../../../core/routing";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { aboutEditFormValidation, IAbout, IAboutForm } from "../../data/entities";
import { AboutForm } from "../components/form";
import { aboutReduxActions } from "../state/state";

export const AboutEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const aboutDetailBranch = useSelector<IAppReduxState, IAsyncData<IAbout>>((state) => state.about.details);
  const editAboutBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.about.edit);

  useEffect(() => {
    dispatch(aboutReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IAboutForm): Promise<void> => {
    await dispatch(aboutReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.about, id));
  };

  return (
    <AboutForm
      initialData={aboutDetailBranch}
      onSubmit={onSubmit}
      branch={editAboutBranch}
      validationSchema={aboutEditFormValidation}
      submitTitle="Edit"
    />
  );
};
