import { Box, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { Link } from "react-router-dom";

import { Routing } from "../core/routing";

interface IProps {
  route: string;
}

export const CreateButton: React.FC<IProps> = ({ route }: IProps) => {
  return (
    <Box py={3}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        to={Routing.generateCreateRoute(route)}
        component={Link}
      >
        Create
      </Button>
    </Box>
  );
};
