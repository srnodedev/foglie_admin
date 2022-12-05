import { Typography } from "@material-ui/core";
import React from "react";

import { fixAmount } from "../core/utils";

interface IProps {
  amount?: number;
}

export const Amount: React.FC<IProps> = ({ amount = 0 }: IProps) => {
  return (
    <Typography
      style={{
        color: amount > 0 ? "green" : amount < 0 ? "red" : "",
      }}
    >
      {amount > 0 ? "+" : ""}
      {fixAmount(amount)} AZN
    </Typography>
  );
};
