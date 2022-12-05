import Typography from "@material-ui/core/Typography";
import React from "react";

import { IAsyncData } from "../core/models";
import { isError } from "../core/redux";

interface IProps {
  branch: IAsyncData<any>;
}

export const ErrorPanel: React.FC<IProps> = ({ branch }: IProps) => {
  if (isError(branch)) {
    return <Typography color="error">{branch.error?.message}</Typography>;
  }

  return null;
};
