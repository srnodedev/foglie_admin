import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { IPasswordForm } from "../../data/entities";
import { PasswordForm } from "../components/password_form";
import { profileRedux } from "../state/state";

interface IProps {}

export const ProfileMainPage: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IPasswordForm): Promise<void> => {
    await dispatch(profileRedux.actions.changePassword(values));
    history.push("/");
  };

  const passwordChangeBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.profile.changePassword);

  return (
    <PasswordForm branch={passwordChangeBranch} onSubmit={onSubmit} initialData={null} submitTitle="Change password" />
  );
};
