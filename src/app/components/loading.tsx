import { createStyles, makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

import { Maybe } from "../core/models";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.2)",
    },
  }),
);

interface IProps {
  children: Maybe<JSX.Element | JSX.Element[]>;
  loading: boolean;
}

export const Loading: React.FC<IProps> = ({ children, loading }: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}

      {loading && (
        <div className={classes.overlay}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};
