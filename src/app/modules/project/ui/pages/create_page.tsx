import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IProjectForm } from "../../data/entities";
import { ProjectForm } from "../components/form";
import { projectReduxActions } from "../state/state";

export const ProjectCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IProjectForm): Promise<void> => {
    await dispatch(projectReduxActions.create(values));
    history.push(ROUTES.project);
  };

  const createProjectBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.project.create);

  return <ProjectForm branch={createProjectBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
