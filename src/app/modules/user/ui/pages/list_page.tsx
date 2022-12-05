import TableCell from "@material-ui/core/TableCell";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateButton } from "../../../../components/create_button";
import { ListTable } from "../../../../components/list_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IUser } from "../../data/entities";
import { userReduxActions } from "../state/state";

export const UserListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userReduxActions.getList());
  }, [dispatch]);
  const userListBranch = useSelector<IAppReduxState, IAsyncData<IUser[]>>((state) => state.user.list);

  const deleteUser = async (id: string): Promise<void> => {
    await dispatch(userReduxActions.delete(id));
    dispatch(userReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.user.delete);

  return (
    <div>
      <CreateButton route={ROUTES.user} />

      <ListTable<IUser>
        branch={userListBranch}
        route={ROUTES.user}
        onDelete={deleteUser}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>Name</TableCell>
          </>
        )}
        renderRow={(user) => (
          <>
            <TableCell>{user.name}</TableCell>
          </>
        )}
      />
    </div>
  );
};
