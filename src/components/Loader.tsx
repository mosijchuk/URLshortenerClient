import React from "react";
import { PageContent } from "./PageContent";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  colorPrimary: {
    backgroundColor: theme.palette.success.main,
  },
}));

const ColorCircularProgress = withStyles((theme) => ({
  root: {
    color: theme.palette.success.main,
  },
}))(CircularProgress);

export const Loader = () => {
  const classes = useStyles();
  return (
    <PageContent>
      <div className={classes.root}>
        <ColorCircularProgress />
      </div>
    </PageContent>
  );
};
