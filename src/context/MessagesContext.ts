import React from "react";
import {GlobalMessage} from "../types/types";

export const MessagesContext = React.createContext({
  updateGlobalMessage: (text?:GlobalMessage["text"], severity?:GlobalMessage["severity"]) => {}
});
