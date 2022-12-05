import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { IAppReduxState } from "../../../../redux/store";
// import { useRouteMatch, useHistory } from "react-router-dom";
// import { UserForm } from "../components/form";
// import { ROUTES } from "../../../../routes";
// import { IAsyncData } from "../../../../core/models";
// import { IUserForm, IUser, userEditFormValidation } from "../../data/entities";
// import { userRedux } from "../state/state";
// import { Routing } from "../../../../core/routing";

export const UserEditPage: React.FC = () => {
  // const match = useRouteMatch<{ id: string }>();
  // const id = match.params.id;
  // const dispatch = useDispatch();
  // const history = useHistory();

  // const userDetailBranch = useSelector<IAppReduxState, IAsyncData<IUser>>((state) => state.user.details);
  // const editUserBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.user.edit);

  // useEffect(() => {
  //   dispatch(userRedux.actions.getDetail(id));
  // }, [dispatch, id]);

  // const onSubmit = async (form: IUserForm): Promise<void> => {
  //   await dispatch(userRedux.actions.edit(id, form));
  //   history.push(Routing.generateDetailRoute(ROUTES.user, id));
  // };

  return (
    <>
      {/* <UserForm
        initialData={userDetailBranch}
        onSubmit={onSubmit}
        branch={editUserBranch}
        validationSchema={userEditFormValidation}
        submitTitle="Edit"
      /> */}
    </>
  );
};
