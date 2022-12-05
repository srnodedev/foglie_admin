import { Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { DetailTable } from "../../../../components/detail_table";
import { Image } from "../../../../components/image";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IAbout } from "../../data/entities";
import { aboutReduxActions } from "../state/state";

export const AboutDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(aboutReduxActions.getDetail(id));
  }, [dispatch, id]);
  const aboutDetailBranch = useSelector<IAppReduxState, IAsyncData<IAbout>>((state) => state.about.details);

  const deleteAbout = async (id: string): Promise<void> => {
    await dispatch(aboutReduxActions.delete(id));
    history.push(ROUTES.about);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.about.delete);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        {aboutDetailBranch.data && (
          <DetailTable
            branch={aboutDetailBranch}
            route={ROUTES.about}
            onDelete={deleteAbout}
            deleteBranch={deleteBranch}
          >
            <Table size="medium" className="detail-table">
              <TableBody>
                <TableRow>
                  <TableCell>Photo</TableCell>
                  <TableCell>
                    <Image image={aboutDetailBranch.data?.image} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Title az</TableCell>
                  <TableCell>{aboutDetailBranch.data?.title.az}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Text az</TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: aboutDetailBranch.data?.text.az }} />
                </TableRow>

                <TableRow>
                  <TableCell>Title en</TableCell>
                  <TableCell>{aboutDetailBranch.data?.title.en}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Text en</TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: aboutDetailBranch.data?.text.en }} />
                </TableRow>

                <TableRow>
                  <TableCell>Title ru</TableCell>
                  <TableCell>{aboutDetailBranch.data?.title.ru}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Text ru</TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: aboutDetailBranch.data?.text.ru }} />
                </TableRow>
              </TableBody>
            </Table>
          </DetailTable>
        )}
      </Grid>
    </Grid>
  );
};
