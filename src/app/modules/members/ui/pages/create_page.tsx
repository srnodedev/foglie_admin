import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IMemberForm } from "../../data/entities";
import { MemberForm } from "../components/form";
import { memberReduxActions } from "../state/state";

export const MemberCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IMemberForm): Promise<void> => {
    // const file = await uploadFile(values.file);
    await dispatch(memberReduxActions.create(values));
    history.push(ROUTES.members);
  };

  const createMemberBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.members.create);

  return <MemberForm branch={createMemberBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
