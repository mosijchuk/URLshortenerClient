import React, {FC, useContext, MouseEvent} from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

type Props = {
  useNavigationStyles: (props?: any) => Record<"menuButtons" | "button", string>
}
export const Navigation:FC<Props> = (props) => {
  const history = useHistory();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const logoutHandler = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
    history.push("/");
  };

  if (!isAuthenticated) {
    return <></>;
  }

  const classes = props.useNavigationStyles();
  return (
    <>
      <div className={classes.menuButtons}>
        <NavLink to="/create" className={classes.button}>
          <Button color="inherit" startIcon={<AddIcon />}>
            Create
          </Button>
        </NavLink>

        <NavLink to="/links" className={classes.button}>
          <Button color="inherit" startIcon={<ListIcon />}>
            My links
          </Button>
        </NavLink>

        <Button
          color="inherit"
          startIcon={<ExitToAppIcon />}
          className={classes.button}
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </div>
    </>
  );
};
