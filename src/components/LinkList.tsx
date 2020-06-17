import React, {FC} from "react";
import { Link } from "react-router-dom";

import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { Copy } from "./Copy";
import {LinkType} from "../types/types";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  empty: {
    color: theme.palette.text.disabled,
  },
}));

type Props = {
  links: Array<LinkType>
}
export const LinkList: FC<Props> = ({ links }) => {
  const classes = useStyles();
  return (
    <>
      {!links.length && <p className={classes.empty}>No links yet</p>}
      {links.length > 0 && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Short link</TableCell>
                <TableCell align="center">Copy</TableCell>
                <TableCell align="right">Link details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link._id}>
                  <TableCell component="th" scope="row">
                    <Link
                      to={`/detail/${link._id}`}
                      className="secondary-content"
                    >
                      {link.to}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Copy text={link.to}>
                      <Button color="default">
                        <FileCopyOutlinedIcon />
                      </Button>
                    </Copy>
                  </TableCell>
                  <TableCell align="right">
                    <Link
                      to={`/detail/${link._id}`}
                      className="secondary-content"
                    >
                      <Button color="default">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
