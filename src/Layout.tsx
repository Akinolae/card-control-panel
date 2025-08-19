import { forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";

const ComponentWrapper = forwardRef((props: MotionProps, ref: any) => {
  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{ y: 300, opacity: 0 }}
      transition={{
        type: "just",
        stiffness: 260,
        damping: 20,
      }}
      {...props}
    >
      {props.children}
    </motion.div>
  );
});

export default ComponentWrapper;
