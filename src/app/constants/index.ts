import { Variants } from "framer-motion";

export const EMAIL_FORMAT = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const SLIDER_VARIANTS: Variants = {
  hidden: {
    y: 800,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    y: 800,
    transition: {
      duration: 0.3,
    },
  },
};
