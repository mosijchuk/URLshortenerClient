import React, {useState, useEffect, useContext, FC, KeyboardEvent} from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase, {InputBaseClassKey} from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from "@material-ui/icons/Link";
import { PageContent } from "../components/PageContent";
import {useMessage} from "../hooks/message.hook";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "6px 12px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  activeColor: {
    color: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const CreatePage:FC = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const { loading, request } = useHttp()
  const [link, setLink] = useState("")
  const [isLink, setIsLink] = useState(false)
  const regLink = /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi
  const message = useMessage();

  useEffect(()=>{
    setIsLink(regLink.test(link))
  },[link])

  const submitHandler = async () => {
    if (link && isLink) {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }else{
      message('Enter correct URL', 'error')
    }
  };

  const pressHandler = (e:KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  const classes = useStyles();

  return (
    <>
      <PageContent pageText="Create a shortened link">
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Insert link"
            id="link"
            type="text"
            name="link"
            autoComplete="off"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />

          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="default"
            disabled={loading}
            className={`${classes.iconButton} ${
              link && isLink && classes.activeColor
            }`}
            onClick={submitHandler}
          >
            <LinkIcon />
          </IconButton>
        </Paper>
      </PageContent>
    </>
  );
};
