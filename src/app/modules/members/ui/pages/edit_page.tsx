import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { Routing } from "../../../../core/routing";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IMember, IMemberForm, memberEditFormValidation } from "../../data/entities";
import { MemberForm } from "../components/form";
import { memberReduxActions } from "../state/state";

export const MemberEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const memberDetailBranch = useSelector<IAppReduxState, IAsyncData<IMember>>((state) => state.members.details);
  const editMemberBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.members.edit);

  useEffect(() => {
    dispatch(memberReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IMemberForm): Promise<void> => {
    await dispatch(memberReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.members, id));
  };

  return (
    <MemberForm
      initialData={memberDetailBranch}
      onSubmit={onSubmit}
      branch={editMemberBranch}
      validationSchema={memberEditFormValidation}
      submitTitle="Edit"
    />
  );
};
