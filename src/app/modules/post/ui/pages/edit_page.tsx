import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { Routing } from "../../../../core/routing";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IPost, IPostForm, postEditFormValidation } from "../../data/entities";
import { PostForm } from "../components/form";
import { postReduxActions } from "../state/state";

export const PostEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const postDetailBranch = useSelector<IAppReduxState, IAsyncData<IPost>>((state) => state.post.details);
  const editPostBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.post.edit);

  useEffect(() => {
    dispatch(postReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IPostForm): Promise<void> => {
    await dispatch(postReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.post, id));
  };

  return (
    <PostForm
      initialData={postDetailBranch}
      onSubmit={onSubmit}
      branch={editPostBranch}
      validationSchema={postEditFormValidation}
      submitTitle="Edit"
    />
  );
};
