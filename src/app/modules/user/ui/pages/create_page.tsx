import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IUserForm } from "../../data/entities";
import { UserForm } from "../components/form";
import { userReduxActions } from "../state/state";

export const UserCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IUserForm): Promise<void> => {
    await dispatch(userReduxActions.create(values));
    history.push(ROUTES.user);
  };

  const createUserBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.user.create);

  return <UserForm branch={createUserBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
