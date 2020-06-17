import React, {FC} from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { Copy } from "./Copy";
import {LinkType} from "../types/types";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    color: theme.palette.success.light,
    backgroundColor: theme.palette.success.dark,
    "& a": {
      fontSize: 18,
      fontWeigth: 700,
    },
    "& button": {
      color: theme.palette.success.main,
    },
    "@media(max-width: 768px)": {
      flexDirection: "column",

      "& a": {
        fontSize: 16,
      },
    },
  },
  table: {
    minWidth: 300,
    "& td": {
      width: "100%",
    },
  },
  tableWrap: {
    marginTop: 50,
  },
  th: {
    minWidth: 120,
  },
}));

type Props = {
  link: LinkType
}
export const LinkCard:FC<Props> = ({ link }) => {
  const classes = useStyles();

  return (
    <>
      <div className="contentWrap">
        <Paper className={classes.root}>
          <a href={link.to} target="_blank" rel="noopener noreferrer">
            {link.to}
          </a>

          <Copy text={link.to}>
            <Button color="default" startIcon={<FileCopyIcon />}>
              Copy
            </Button>
          </Copy>
        </Paper>

        <TableContainer component={Paper} className={classes.tableWrap}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" className={classes.th}>
                  Original link
                </TableCell>
                <TableCell align="left">{link.from}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" className={classes.th}>
                  Clicks
                </TableCell>
                <TableCell align="left">
                  <strong>{link.clicks}</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" className={classes.th}>
                  Created at
                </TableCell>
                <TableCell align="left">
                  <strong>{new Date(link.date).toLocaleDateString()}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
