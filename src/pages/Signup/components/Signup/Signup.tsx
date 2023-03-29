import AuthLayout from "../../../../layouts/AuthLayout/AuthLayout";
import SignupForm from "../SignupForm/SignupForm";
import ThemeButton from "../ThemeButton/ThemeButton";

const Signup: React.FC = () => {
  return (
    <AuthLayout>
      <ThemeButton />
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
