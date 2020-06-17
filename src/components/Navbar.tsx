import React, {FC, useContext} from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LinkIcon from "@material-ui/icons/Link";
import Avatar from "@material-ui/core/Avatar";
import { Navigation } from "./Navigation";
import { useWindowSize } from "../hooks/window.hook";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.dark,
    marginRight: 12,
  },
}));

const useNavigationStyles = makeStyles((theme) => ({
  menuButtons: {
    marginLeft: "auto",
  },
  button: {
    marginLeft: 10,
    "&.active button": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export const Logo: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.logoWrap}>
      <Avatar className={classes.logo}>
        <LinkIcon />
      </Avatar>
      <Typography variant="h6">URL Shortener</Typography>
    </div>
  );
};

export const Navbar:FC = () => {
  const classes = useStyles();
  const { isMobile } = useWindowSize();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Logo />
          {!isMobile && isAuthenticated && (
            <Navigation useNavigationStyles={useNavigationStyles} />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
