import React, {FC} from "react";

type Props = {
    text: string
}
export const PageHeader:FC<Props> = ({ text }) => {
  return (
    <header className="pageHeader">
      <h2>{text || "Hello"}</h2>
    </header>
  );
};
