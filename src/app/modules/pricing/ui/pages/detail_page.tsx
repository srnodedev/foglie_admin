import { Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { DetailTable } from "../../../../components/detail_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IPricing } from "../../data/entities";
import { pricingReduxActions } from "../state/state";

export const PricingDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(pricingReduxActions.getDetail(id));
  }, [dispatch, id]);
  const pricingDetailBranch = useSelector<IAppReduxState, IAsyncData<IPricing>>((state) => state.pricing.details);

  const deletePricing = async (id: string): Promise<void> => {
    await dispatch(pricingReduxActions.delete(id));
    history.push(ROUTES.pricing);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.pricing.delete);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <DetailTable
          branch={pricingDetailBranch}
          route={ROUTES.pricing}
          onDelete={deletePricing}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Title az</TableCell>
                <TableCell>{pricingDetailBranch.data?.title.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description az</TableCell>
                <TableCell>{pricingDetailBranch.data?.description.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Title en</TableCell>
                <TableCell>{pricingDetailBranch.data?.title.en}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description en</TableCell>
                <TableCell>{pricingDetailBranch.data?.description.en}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Title ru</TableCell>
                <TableCell>{pricingDetailBranch.data?.title.ru}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description ru</TableCell>
                <TableCell>{pricingDetailBranch.data?.description.ru}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
