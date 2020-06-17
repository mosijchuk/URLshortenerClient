import React, {ChangeEvent, FC, SyntheticEvent} from "react";
import { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import { PageContent } from "../components/PageContent";
import { Paper, InputBase } from "@material-ui/core";
import { Logo } from "../components/Navbar";
import {Form, LoginData, RegisterData} from "../types/types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    marginTop: "2rem",
  },
  formGroup: {
    marginBottom: 16,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
  },
  buttonReg: {
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.background.default,
    width: "max-content",
    "&:hover": {
      backgroundColor: theme.palette.text.disabled,
    },
  },
  buttonLogin: {
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.success.main,
    width: "max-content",
    marginRight: 16,
    "&:hover": { backgroundColor: theme.palette.success.dark, opacity: "0.9" },
  },

  inputWrap: {
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const CssTextField = withStyles((theme) => ({
  root: {
    "& input": {
      backgroundColor: theme.palette.background.paper,
    },
    "& input:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0 30px ${theme.palette.background.paper} inset !important`,
    },
    "& input:-webkit-autofill:focus": {
      "-webkit-box-shadow": `0 0 0 30px ${theme.palette.background.paper} inset !important`,
    },
    "& *-webkit-text-fill-color": "#fff",
    "& label.Mui-focused": {
      color: theme.palette.text.primary,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.text.secondary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.text.disabled,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.secondary,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.text.secondary,
      },
    },
  },
}))(InputBase);

export const AuthPage:FC = () => {
  const auth = useContext(AuthContext);
  const { loading, error, request, clearErrors } = useHttp();
  const message = useMessage();
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  useEffect(() => {
    error && message(error, 'error');
    clearErrors();
  }, [error, message, clearErrors]);



  const changeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const loginHandler = async () => {
    try {
      const data:LoginData = await request("/api/auth/login", "POST", { ...form })

      auth.login(data.token, data.userId)
    } catch (error) {}
  };

  const registerHandler = async () => {
    try {
      const data:RegisterData = await request("/api/auth/register", "POST", { ...form });
      message(data.message, "success");
    } catch (error) {}
  };

  const classes = useStyles();
  return (
    <>
      <PageContent params={{ md: 6, lg: 4 }}>
        <Logo />
        <form className={classes.form}>
          <Paper className={classes.inputWrap}>
            <CssTextField
              className={classes.input}
              id="email"
              name="email"
              placeholder="Email"
              onChange={changeHandler}
              value={form.email}
            />
          </Paper>
          <Paper className={classes.inputWrap}>
            <CssTextField
              className={classes.input}
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              onChange={changeHandler}
              value={form.password}
            />
          </Paper>

          <FormGroup className={`${classes.formGroup} ${classes.buttonGroup}`}>
            <Button
              variant="contained"
              size="large"
              className={classes.buttonLogin}
              onClick={loginHandler}
              disabled={loading}
            >
              Login
            </Button>
            <Button
              variant="contained"
              size="large"
              className={classes.buttonReg}
              onClick={registerHandler}
              disabled={loading}
            >
              Registration
            </Button>
          </FormGroup>
        </form>
      </PageContent>
    </>
  );
};
