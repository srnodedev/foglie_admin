import { Box } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateButton } from "../../../../components/create_button";
import { ListTable } from "../../../../components/list_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IAbout } from "../../data/entities";
import { aboutReduxActions } from "../state/state";

export const AboutListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(aboutReduxActions.getList());
  }, [dispatch]);
  const aboutListBranch = useSelector<IAppReduxState, IAsyncData<IAbout[]>>((state) => state.about.list);

  const deleteAbout = async (id: string): Promise<void> => {
    await dispatch(aboutReduxActions.delete(id));
    dispatch(aboutReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.about.delete);

  return (
    <div>
      {!aboutListBranch.data?.length ? <CreateButton route={ROUTES.about} /> : <Box pt={4} />}

      <ListTable<IAbout>
        branch={aboutListBranch}
        route={ROUTES.about}
        onDelete={deleteAbout}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>Title az</TableCell>
            <TableCell>Title en</TableCell>
            <TableCell>Title ru</TableCell>
            <TableCell>Text az</TableCell>
            <TableCell>Text en</TableCell>
            <TableCell>Text ru</TableCell>
          </>
        )}
        renderRow={(about) => (
          <>
            <TableCell>{about.title.az}</TableCell>
            <TableCell>{about.title.en}</TableCell>
            <TableCell>{about.title.ru}</TableCell>
            <TableCell>{about.text.az}</TableCell>
            <TableCell>{about.text.en}</TableCell>
            <TableCell>{about.text.ru}</TableCell>
          </>
        )}
      />
    </div>
  );
};
