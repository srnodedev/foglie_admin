import TableCell from "@material-ui/core/TableCell";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateButton } from "../../../../components/create_button";
import { ListTable } from "../../../../components/list_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { ICategory } from "../../data/entities";
import { categoryReduxActions } from "../state/state";

export const CategoryListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryReduxActions.getList());
  }, [dispatch]);
  const categoryListBranch = useSelector<IAppReduxState, IAsyncData<ICategory[]>>((state) => state.category.list);

  const deleteCategory = async (id: string): Promise<void> => {
    await dispatch(categoryReduxActions.delete(id));
    dispatch(categoryReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.category.delete);

  return (
    <div>
      <CreateButton route={ROUTES.category} />

      <ListTable<ICategory>
        branch={categoryListBranch}
        route={ROUTES.category}
        onDelete={deleteCategory}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>Name az</TableCell>
            <TableCell>Name en</TableCell>
            <TableCell>Name ru</TableCell>
          </>
        )}
        renderRow={(category) => (
          <>
            <TableCell>{category.name.az}</TableCell>
            <TableCell>{category.name.en}</TableCell>
            <TableCell>{category.name.ru}</TableCell>
          </>
        )}
      />
    </div>
  );
};
