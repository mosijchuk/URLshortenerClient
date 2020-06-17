import React, {FC, useContext} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { MessagesContext } from "../context/MessagesContext";

type Props = {
    text: string
    children: React.ReactNode
}
export const Copy:FC<Props> = (props) => {
  const { updateGlobalMessage } = useContext(MessagesContext);

  const handleClickCopy = () => {
    updateGlobalMessage("Copied to clipboard", "success");
  };
  return (
    <>
      <CopyToClipboard
        text={(props.text && props.text) || ""}
        onCopy={handleClickCopy}
      >
        {props.children}
      </CopyToClipboard>
    </>
  );
};
