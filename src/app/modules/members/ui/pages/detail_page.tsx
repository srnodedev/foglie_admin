import { Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { DetailTable } from "../../../../components/detail_table";
import { Image } from "../../../../components/image";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IMember } from "../../data/entities";
import { memberReduxActions } from "../state/state";

export const MemberDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(memberReduxActions.getDetail(id));
  }, [dispatch, id]);
  const memberDetailBranch = useSelector<IAppReduxState, IAsyncData<IMember>>((state) => state.members.details);

  const deleteMember = async (id: string): Promise<void> => {
    await dispatch(memberReduxActions.delete(id));
    history.push(ROUTES.members);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.members.delete);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <DetailTable
          branch={memberDetailBranch}
          route={ROUTES.members}
          onDelete={deleteMember}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell>
                  <Image image={memberDetailBranch.data?.image} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Name az</TableCell>
                <TableCell>
                  {memberDetailBranch.data?.firstName.az} {memberDetailBranch.data?.lastName.az}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Name en</TableCell>
                <TableCell>
                  {memberDetailBranch.data?.firstName.en} {memberDetailBranch.data?.lastName.en}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Name ru</TableCell>
                <TableCell>
                  {memberDetailBranch.data?.firstName.ru} {memberDetailBranch.data?.lastName.ru}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Position az</TableCell>
                <TableCell>{memberDetailBranch.data?.position.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Position en</TableCell>
                <TableCell>{memberDetailBranch.data?.position.en}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Position ru</TableCell>
                <TableCell>{memberDetailBranch.data?.position.ru}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
