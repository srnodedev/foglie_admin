import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
  }),
);

interface IProps {
  children: JSX.Element;
}

export const Center: React.FC<IProps> = ({ children }: IProps) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
