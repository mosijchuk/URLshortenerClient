import React, {FC} from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Navigation } from "./Navigation";
import { Logo } from "./Navbar";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
    top: "auto",
    bottom: 0,
  },
}));

const useNavigationStyles = makeStyles((theme) => ({
  menuButtons: {
    margin: "auto",
  },
  button: {
    marginLeft: 10,
    "& .MuiButton-label": {
      display: "flex",
      flexDirection: "column",
      fontSize: 12,

      "& span": {
        margin: 0,
        marginBottom: 3,
      },
    },
    "&.active button": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export const NavbarMobile:FC = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Navigation useNavigationStyles={useNavigationStyles} />
        </Toolbar>
      </AppBar>
    </>
  );
};
