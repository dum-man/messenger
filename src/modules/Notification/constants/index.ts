import { Variants } from "framer-motion";

export const VARIANTS: Variants = {
  hidden: {
    y: -200,
  },
  visible: {
    y: 0,
  },
  exit: {
    y: -200,
    transition: {
      duration: 0.3,
    },
  },
};
