import React, { memo } from "react";
import MuiCard from "@mui/material/Card";

type CardProps = {
  children: React.ReactNode;
  sx?: object;
} & any;

const Card: React.FC<CardProps> = memo(({ rest, children, sx }) => {
  return (
    <MuiCard sx={{ borderRadius: 3, p: 5, ...sx }} {...rest}>
      {children}
    </MuiCard>
  );
});

export default Card;
