import React, {useState, useEffect, useContext, FC} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { MessagesContext } from "../context/MessagesContext";
import {GlobalMessage} from "../types/types";

type Props = {
  message: GlobalMessage
}
export const Message:FC<Props> = ({ message }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const { updateGlobalMessage } = useContext(MessagesContext);

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    setOpenAlert(!!message.text);
  }, [message.text]);

  useEffect(() => {
    !openAlert &&
      setTimeout(() => {
        updateGlobalMessage();
      }, 500);
  }, [openAlert]);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={message.severity}>
          {message.text}
        </Alert>
      </Snackbar>
    </>
  );
};
