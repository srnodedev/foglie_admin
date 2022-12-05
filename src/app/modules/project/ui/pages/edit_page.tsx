import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { Routing } from "../../../../core/routing";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IProject, IProjectForm, projectEditFormValidation } from "../../data/entities";
import { ProjectForm } from "../components/form";
import { projectReduxActions } from "../state/state";

export const ProjectEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const projectDetailBranch = useSelector<IAppReduxState, IAsyncData<IProject>>((state) => state.project.details);
  const editProjectBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.project.edit);

  useEffect(() => {
    dispatch(projectReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IProjectForm): Promise<void> => {
    await dispatch(projectReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.project, id));
  };

  return (
    <ProjectForm
      initialData={projectDetailBranch}
      onSubmit={onSubmit}
      branch={editProjectBranch}
      validationSchema={projectEditFormValidation}
      submitTitle="Edit"
    />
  );
};
