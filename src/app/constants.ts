import { Variants } from "framer-motion";

export const FIREBASE_LOGIN_ERRORS = {
  "Firebase: Error (auth/email-already-in-use).": "A user with that email already exists",
  "Firebase: Error (auth/user-not-found).": "User not found",
  "Firebase: Error (auth/wrong-password).": "Invalid password",
};

export const FIREBASE_REGISTER_ERROR = {
  "Firebase: Error (auth/email-already-in-use).": "Email already in use",
};

export const EMAIL_FORMAT = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const CONVERSATION_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const MENU_VARIANTS: Variants = {
  hidden: {
    scale: 0.3,
  },
  visible: {
    scale: 1,
  },
  exit: {
    scale: 0.3,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const RESET_VARIANTS: Variants = {
  hidden: {
    scale: 0.5,
  },
  visible: {
    scale: 1,
  },
};

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

export const MESSAGE_SEEN_VARIANTS: Variants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
  },
};

export const NEW_MESSAGE_VARIANTS: Variants = {
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

export const DELETE_BUTTON_VARIANTS: Variants = {
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
