import React, {FC} from "react";
import { Grid } from "@material-ui/core";
import { PageHeader } from "./PageHeader";

type GridType =  boolean | 12 | 8 | 6 | "auto" | 1 | 2 | 3 | 4 | 5 | 7 | 9 | 10 | 11 | undefined
type Props = {
  params?: {
    xs?: GridType
    md?: GridType
    lg?: GridType
    align?: string
  }
  pageText?: string
  children: React.ReactNode
}
export const PageContent:FC<Props> = (props) => {
  const params = {
    xs: (props.params && props.params.xs) || 12,
    md: (props.params && props.params.md) || 8,
    lg: (props.params && props.params.lg) || 6,
    align: (props.params && props.params.align) || "alignCenter",
  };
  return (
    <>
      <div className={`mainViewPort ${params.align}`}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={params.xs} md={params.md} lg={params.lg}>
            {props.pageText && <PageHeader text={props.pageText} />}
            {props.children}
          </Grid>
        </Grid>
      </div>
    </>
  );
};
