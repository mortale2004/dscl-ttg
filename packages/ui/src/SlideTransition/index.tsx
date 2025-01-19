import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { forwardRef, memo, ReactElement } from "react";

type SlideTransitionProps = {
  children: ReactElement<unknown, any>;
} & TransitionProps;

const SlideTransition: React.FC<SlideTransitionProps> = memo(
  forwardRef(({ children, ...slideTransitionProps }, ref) => {
    return (
      <Slide direction="up" ref={ref} {...slideTransitionProps}>
        {children}
      </Slide>
    );
  }),
);

export default SlideTransition;
