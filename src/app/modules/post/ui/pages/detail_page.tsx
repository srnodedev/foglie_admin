import { Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { DetailTable } from "../../../../components/detail_table";
import { Image } from "../../../../components/image";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IPost } from "../../data/entities";
import { postReduxActions } from "../state/state";

export const PostDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(postReduxActions.getDetail(id));
  }, [dispatch, id]);
  const postDetailBranch = useSelector<IAppReduxState, IAsyncData<IPost>>((state) => state.post.details);

  const deletePost = async (id: string): Promise<void> => {
    await dispatch(postReduxActions.delete(id));
    history.push(ROUTES.post);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.post.delete);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={8}>
        {postDetailBranch.data && (
          <DetailTable branch={postDetailBranch} route={ROUTES.post} onDelete={deletePost} deleteBranch={deleteBranch}>
            <Table size="medium" className="detail-table">
              <TableBody>
                <TableRow>
                  <TableCell>Banner</TableCell>
                  <TableCell>
                    <Image image={postDetailBranch.data?.image} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>{postDetailBranch.data?.title.az}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{postDetailBranch.data?.description.az}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Content</TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: postDetailBranch.data?.content.az }} />
                </TableRow>

                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>{postDetailBranch.data?.title.en}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{postDetailBranch.data?.description.en}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Content</TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: postDetailBranch.data?.content.en }} />
                </TableRow>

                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>{postDetailBranch.data?.title.ru}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{postDetailBranch.data?.description.ru}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Content</TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: postDetailBranch.data?.content.ru }} />
                </TableRow>
              </TableBody>
            </Table>
          </DetailTable>
        )}
      </Grid>
    </Grid>
  );
};
