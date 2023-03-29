import { Variants } from "framer-motion";

export const VARIANTS: Variants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: { type: "spring", duration: 0.2 },
  },
  exit: {
    scale: 0,
    transition: {
      type: "spring",
      duration: 0.2,
    },
  },
};
