import { Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { DetailTable } from "../../../../components/detail_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { ICategory } from "../../data/entities";
import { categoryReduxActions } from "../state/state";

export const CategoryDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(categoryReduxActions.getDetail(id));
  }, [dispatch, id]);
  const categoryDetailBranch = useSelector<IAppReduxState, IAsyncData<ICategory>>((state) => state.category.details);

  const deleteCategory = async (id: string): Promise<void> => {
    await dispatch(categoryReduxActions.delete(id));
    history.push(ROUTES.category);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.category.delete);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <DetailTable
          branch={categoryDetailBranch}
          route={ROUTES.category}
          onDelete={deleteCategory}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Name az</TableCell>
                <TableCell>{categoryDetailBranch.data?.name.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Name en</TableCell>
                <TableCell>{categoryDetailBranch.data?.name.en}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Name ru</TableCell>
                <TableCell>{categoryDetailBranch.data?.name.ru}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Sub categories az</TableCell>
                <TableCell>
                  {categoryDetailBranch.data?.children?.map((c, index) => (
                    <p key={index}>{c.name.az}</p>
                  ))}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Sub categories en</TableCell>
                <TableCell>
                  {categoryDetailBranch.data?.children?.map((c, index) => (
                    <p key={index}>{c.name.en}</p>
                  ))}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Sub categories ru</TableCell>
                <TableCell>
                  {categoryDetailBranch.data?.children?.map((c, index) => (
                    <p key={index}>{c.name.ru}</p>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
