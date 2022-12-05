import TableCell from "@material-ui/core/TableCell";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateButton } from "../../../../components/create_button";
import { ListTable } from "../../../../components/list_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IProject } from "../../data/entities";
import { projectReduxActions } from "../state/state";

export const ProjectListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectReduxActions.getList());
  }, [dispatch]);
  const projectListBranch = useSelector<IAppReduxState, IAsyncData<IProject[]>>((state) => state.project.list);

  const deleteProject = async (id: string): Promise<void> => {
    await dispatch(projectReduxActions.delete(id));
    dispatch(projectReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.project.delete);

  return (
    <div>
      <CreateButton route={ROUTES.project} />

      <ListTable<IProject>
        branch={projectListBranch}
        route={ROUTES.project}
        onDelete={deleteProject}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>Title az</TableCell>
            <TableCell>Client az</TableCell>
            <TableCell>Location az</TableCell>
          </>
        )}
        renderRow={(project) => (
          <>
            <TableCell>{project.title.az}</TableCell>
            <TableCell>{project.client.az}</TableCell>
            <TableCell>{project.location.az}</TableCell>
          </>
        )}
      />
    </div>
  );
};
