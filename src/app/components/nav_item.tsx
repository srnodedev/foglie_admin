import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  icon: JSX.Element;
  text: string;
  to: string;
  onClick: () => any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navItem: {
      color: theme.palette.text.primary,
      textDecoration: "none",
      display: "block",
    },
    active: {
      backgroundColor: "rgba(0, 0, 0, 0.14)",
    },
  }),
);

export const NavItem: React.FC<IProps> = ({ icon, to, text, onClick }: IProps) => {
  const classes = useStyles();

  return (
    <NavLink to={to} onClick={onClick} className={classes.navItem} activeClassName={classes.active}>
      <ListItem button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </NavLink>
  );
};
