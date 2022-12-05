import { Box, IconButton, TableCell } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { Link } from "react-router-dom";

import { Routing } from "../core/routing";

interface IProps {
  route?: string;
  id: string;
  onDelete?: (id: string) => void;
}

export const ActionTableCell: React.FC<IProps> = ({ onDelete, route, id }: IProps) => {
  return (
    <TableCell
      align="right"
      padding="none"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {route && (
        <Box mr={1} component="span">
          <IconButton to={Routing.generateEditRoute(route, id)} component={Link}>
            <EditIcon />
          </IconButton>
        </Box>
      )}

      {onDelete && (
        <IconButton onClick={() => onDelete(id)}>
          <DeleteIcon />
        </IconButton>
      )}
    </TableCell>
  );
};
