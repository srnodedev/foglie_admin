import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { IAsyncData } from "../../../../core/models";
import { Routing } from "../../../../core/routing";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { categoryEditFormValidation, ICategory, ICategoryForm } from "../../data/entities";
import { CategoryForm } from "../components/form";
import { categoryReduxActions } from "../state/state";

export const CategoryEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const categoryDetailBranch = useSelector<IAppReduxState, IAsyncData<ICategory>>((state) => state.category.details);
  const editCategoryBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.category.edit);

  useEffect(() => {
    dispatch(categoryReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: ICategoryForm): Promise<void> => {
    await dispatch(categoryReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.category, id));
  };

  return (
    <CategoryForm
      initialData={categoryDetailBranch}
      onSubmit={onSubmit}
      branch={editCategoryBranch}
      validationSchema={categoryEditFormValidation}
      submitTitle="Edit"
    />
  );
};
