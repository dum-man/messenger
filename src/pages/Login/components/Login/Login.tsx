import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import AuthLayout from "../../../../layouts/AuthLayout/AuthLayout";
import ResetPassword from "../../../../modules/ResetPassword";
import LoginForm from "../LoginForm/LoginForm";
import ThemeButton from "../ThemeButton/ThemeButton";

const Login: React.FC = () => {
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  return (
    <AuthLayout>
      <ThemeButton />
      <LoginForm setResetPasswordOpen={setResetPasswordOpen} />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {resetPasswordOpen && <ResetPassword setOpen={setResetPasswordOpen} />}
      </AnimatePresence>
    </AuthLayout>
  );
};

export default Login;
