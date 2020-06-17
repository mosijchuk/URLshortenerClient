import { useCallback, useContext } from "react";
import { MessagesContext } from "../context/MessagesContext";
import {GlobalMessage} from "../types/types";

export const useMessage = () => {
  const { updateGlobalMessage } = useContext(MessagesContext);
  return useCallback((alertText:GlobalMessage["text"], alertType:GlobalMessage["severity"]) => {
    alertText && updateGlobalMessage(alertText, alertType);
  }, [updateGlobalMessage]);
};
