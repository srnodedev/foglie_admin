import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IFileForm } from "../../data/entities";
import { FileForm } from "../components/form";
import { fileReduxActions } from "../state/state";

export const FileCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IFileForm): Promise<void> => {
    await dispatch(fileReduxActions.create(values));
    history.push(ROUTES.file);
  };

  const createFileBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.file.create);

  return <FileForm branch={createFileBranch} onSubmit={onSubmit} initialData={null} submitTitle="Upload" />;
};
