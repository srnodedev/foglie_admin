import { Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { DetailTable } from "../../../../components/detail_table";
import { Image } from "../../../../components/image";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IFile } from "../../data/entities";
import { fileReduxActions } from "../state/state";

export const FileDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fileReduxActions.getDetail(id));
  }, [dispatch, id]);
  const fileDetailBranch = useSelector<IAppReduxState, IAsyncData<IFile>>((state) => state.file.details);

  const deleteFile = async (id: string): Promise<void> => {
    await dispatch(fileReduxActions.delete(id));
    history.push(ROUTES.file);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.file.delete);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        {fileDetailBranch.data && (
          <DetailTable branch={fileDetailBranch} route={ROUTES.file} onDelete={deleteFile} deleteBranch={deleteBranch}>
            <Table size="medium" className="detail-table">
              <TableBody>
                <TableRow>
                  <TableCell>Url</TableCell>
                  <TableCell>{fileDetailBranch.data.image.url}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>
                    <Image image={fileDetailBranch.data?.image} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DetailTable>
        )}
      </Grid>
    </Grid>
  );
};
