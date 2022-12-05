import { Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { DetailTable } from "../../../../components/detail_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { ISlider } from "../../data/entities";
import { sliderReduxActions } from "../state/state";

export const SliderDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(sliderReduxActions.getDetail(id));
  }, [dispatch, id]);
  const sliderDetailBranch = useSelector<IAppReduxState, IAsyncData<ISlider>>((state) => state.slider.details);

  const deleteSlider = async (id: string): Promise<void> => {
    await dispatch(sliderReduxActions.delete(id));
    history.push(ROUTES.slider);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.slider.delete);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <DetailTable
          branch={sliderDetailBranch}
          route={ROUTES.slider}
          onDelete={deleteSlider}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Title az</TableCell>
                <TableCell>{sliderDetailBranch.data?.title.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description az</TableCell>
                <TableCell>{sliderDetailBranch.data?.description.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Title en</TableCell>
                <TableCell>{sliderDetailBranch.data?.title.en}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description en</TableCell>
                <TableCell>{sliderDetailBranch.data?.description.en}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Title ru</TableCell>
                <TableCell>{sliderDetailBranch.data?.title.ru}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description ru</TableCell>
                <TableCell>{sliderDetailBranch.data?.description.ru}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
