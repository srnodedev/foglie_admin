import TableCell from "@material-ui/core/TableCell";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateButton } from "../../../../components/create_button";
import { ListTable } from "../../../../components/list_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IPost } from "../../data/entities";
import { postReduxActions } from "../state/state";

export const PostListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postReduxActions.getList());
  }, [dispatch]);
  const postListBranch = useSelector<IAppReduxState, IAsyncData<IPost[]>>((state) => state.post.list);

  const deletePost = async (id: string): Promise<void> => {
    await dispatch(postReduxActions.delete(id));
    dispatch(postReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.post.delete);

  return (
    <div>
      <CreateButton route={ROUTES.post} />

      <ListTable<IPost>
        branch={postListBranch}
        route={ROUTES.post}
        onDelete={deletePost}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
          </>
        )}
        renderRow={(post) => (
          <>
            <TableCell>{post.title.az}</TableCell>
            <TableCell>{post.description.az}</TableCell>
          </>
        )}
      />
    </div>
  );
};
