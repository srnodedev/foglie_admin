import { Snackbar, Tooltip, Typography } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateButton } from "../../../../components/create_button";
import { ListTable } from "../../../../components/list_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IFile } from "../../data/entities";
import { fileReduxActions } from "../state/state";

export const FileListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fileReduxActions.getList());
  }, [dispatch]);
  const fileListBranch = useSelector<IAppReduxState, IAsyncData<IFile[]>>((state) => state.file.list);

  const deleteFile = async (id: string): Promise<void> => {
    await dispatch(fileReduxActions.delete(id));
    dispatch(fileReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.file.delete);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  function handleClose() {
    setSnackBarOpen(false);
  }

  return (
    <div>
      <CreateButton route={ROUTES.file} />

      <ListTable<IFile>
        branch={fileListBranch}
        route={ROUTES.file}
        onDelete={deleteFile}
        deleteBranch={deleteBranch}
        canEdit={false}
        renderHeader={() => (
          <>
            <TableCell>Preview</TableCell>
            <TableCell>Url</TableCell>
          </>
        )}
        renderRow={(file) => (
          <>
            <TableCell>
              <img src={file.image.url} height={50} width={80} alt="" />
            </TableCell>
            <TableCell
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(file.image.url).then(() => {
                  setSnackBarOpen(true);
                });
              }}
              title="Click to copy!"
            >
              <Tooltip title="Click to copy!" aria-label="add">
                <Typography>{file.image.url}</Typography>
              </Tooltip>
            </TableCell>
          </>
        )}
      />

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Copied!"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
};
