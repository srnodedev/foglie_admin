import { Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { DetailTable } from "../../../../components/detail_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IProject } from "../../data/entities";
import { projectReduxActions } from "../state/state";

export const ProjectDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(projectReduxActions.getDetail(id));
  }, [dispatch, id]);
  const projectDetailBranch = useSelector<IAppReduxState, IAsyncData<IProject>>((state) => state.project.details);

  const deleteProject = async (id: string): Promise<void> => {
    await dispatch(projectReduxActions.delete(id));
    history.push(ROUTES.project);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.project.delete);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <DetailTable
          branch={projectDetailBranch}
          route={ROUTES.project}
          onDelete={deleteProject}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Title az</TableCell>
                <TableCell>{projectDetailBranch.data?.title.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Title en</TableCell>
                <TableCell>{projectDetailBranch.data?.title.en}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Title ru</TableCell>
                <TableCell>{projectDetailBranch.data?.title.ru}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Client az</TableCell>
                <TableCell>{projectDetailBranch.data?.client.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Client en</TableCell>
                <TableCell>{projectDetailBranch.data?.client.en}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Client ru</TableCell>
                <TableCell>{projectDetailBranch.data?.client.ru}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Location az</TableCell>
                <TableCell>{projectDetailBranch.data?.location.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Location en</TableCell>
                <TableCell>{projectDetailBranch.data?.location.en}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Location ru</TableCell>
                <TableCell>{projectDetailBranch.data?.location.ru}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Scale az</TableCell>
                <TableCell>{projectDetailBranch.data?.scale.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Scale en</TableCell>
                <TableCell>{projectDetailBranch.data?.scale.en}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Scale ru</TableCell>
                <TableCell>{projectDetailBranch.data?.scale.ru}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content az</TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: projectDetailBranch.data?.content.az ?? "" }} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content en</TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: projectDetailBranch.data?.content.en ?? "" }} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content ru</TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: projectDetailBranch.data?.content.ru ?? "" }} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
