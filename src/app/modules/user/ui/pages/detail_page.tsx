import { Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { DetailTable } from "../../../../components/detail_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IUser } from "../../data/entities";
import { userReduxActions } from "../state/state";

export const UserDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(userReduxActions.getDetail(id));
  }, [dispatch, id]);
  const userDetailBranch = useSelector<IAppReduxState, IAsyncData<IUser>>((state) => state.user.details);

  const deleteUser = async (id: string): Promise<void> => {
    await dispatch(userReduxActions.delete(id));
    history.push(ROUTES.user);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.user.delete);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <DetailTable branch={userDetailBranch} route={ROUTES.user} onDelete={deleteUser} deleteBranch={deleteBranch}>
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell>{userDetailBranch.data?.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{userDetailBranch.data?.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
