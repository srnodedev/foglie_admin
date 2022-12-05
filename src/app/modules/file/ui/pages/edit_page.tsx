import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { Routing } from "../../../../core/routing";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { fileEditFormValidation, IFile, IFileForm } from "../../data/entities";
import { FileForm } from "../components/form";
import { fileReduxActions } from "../state/state";

export const FileEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const fileDetailBranch = useSelector<IAppReduxState, IAsyncData<IFile>>((state) => state.file.details);
  const editFileBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.file.edit);

  useEffect(() => {
    dispatch(fileReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IFileForm): Promise<void> => {
    await dispatch(fileReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.file, id));
  };

  return (
    <FileForm
      initialData={fileDetailBranch}
      onSubmit={onSubmit}
      branch={editFileBranch}
      validationSchema={fileEditFormValidation}
      submitTitle="Edit"
    />
  );
};
