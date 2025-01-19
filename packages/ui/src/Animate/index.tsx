import React, { memo, ReactNode } from "react";
import { motion } from "motion/react";
type AnimateProps = {
  children: ReactNode;
} & any;

const Animate: React.FC<AnimateProps> = memo(({ children, ...rest }) => {
  return (
    <motion.section
      initial={{ transform: "translateY(100px)" }}
      animate={{ transform: "translateY(0px)" }}
      transition={{ type: "spring" }}
      {...rest}
    >
      {children}
    </motion.section>
  );
});

export default Animate;
