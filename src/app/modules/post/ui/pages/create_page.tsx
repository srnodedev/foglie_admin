import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IPostForm } from "../../data/entities";
import { PostForm } from "../components/form";
import { postReduxActions } from "../state/state";

export const PostCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IPostForm): Promise<void> => {
    await dispatch(postReduxActions.create(values));
    history.push(ROUTES.post);
  };

  const createPostBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.post.create);

  return <PostForm branch={createPostBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
