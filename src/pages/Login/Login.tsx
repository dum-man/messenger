import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useIsFirstRender } from "usehooks-ts";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BiHide, BiShow } from "react-icons/bi";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Spinner from "../../components/UI/Spinner";
import ResetPassword from "../../components/Sliders/ResetPassword";
import ThemeToggle from "../../components/UI/ThemeToggle";
import SetUserData from "../../components/Sliders/SetUserData";
import { auth } from "../../app/firebase";
import { signInWithGoogle } from "../../app/service/usersService";
import { EMAIL_FORMAT, FIREBASE_LOGIN_ERRORS } from "../../app/constants";

const Wrapper = styled.div`
  position: relative;
  width: 90%;
  min-width: 300px;
  max-width: 450px;
  padding: 0 10px;
  @media (max-width: 768px) {
    margin-bottom: auto;
  }
`;

const ThemeToggleWrapper = styled.div`
  position: absolute;
  top: 17px;
  right: 17px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.2s;
`;

const SignupLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.textPrimary};
  text-decoration: none;
  transition: color 0.2s;
  :hover {
    text-decoration: underline;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  height: 55px;
  margin-bottom: 15px;
`;

const Show = styled.button`
  position: absolute;
  top: 10px;
  bottom: 10px;
  right: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 28px;
  color: ${({ theme }) => theme.placeholder};
  border-radius: 50%;
`;

const ResetButton = styled.button`
  margin-bottom: 10px;
  padding: 5px;
  padding-left: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.2s;
  :hover {
    text-decoration: underline;
  }
`;

const GoogleButton = styled(Button)`
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.inputPrimary};
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser] = useAuthState(auth);
  const isFirstRender = useIsFirstRender();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signInWithEmailLoading, setSignInWithEmailLoading] = useState(false);
  const [signInWithGoogleLoading, setSignInWithGoogleLoading] = useState(false);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!emailRef.current || !passwordRef.current) {
      return;
    }
    const email = emailRef.current?.value.replaceAll(" ", "").toLowerCase();
    const password = passwordRef.current?.value.replaceAll(" ", "");

    if (!EMAIL_FORMAT.test(email)) {
      toast.error("Invalid email");
      return;
    }
    if (password.length < 6) {
      toast.error("Password is too short");
      return;
    }
    try {
      setSignInWithEmailLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch (error: any) {
      console.log(error.message);
      toast.error(
        FIREBASE_LOGIN_ERRORS[error.message as keyof typeof FIREBASE_LOGIN_ERRORS] ||
          error.message
      );
    }
    setSignInWithEmailLoading(false);
  };

  const handleSignInWithGoogle = async () => {
    setSignInWithGoogleLoading(true);
    try {
      const userExists = await signInWithGoogle();
      if (userExists) {
        navigate("/", { replace: true });
      } else {
        setUserModalOpen(true);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setSignInWithGoogleLoading(false);
  };

  useEffect(() => {
    if (isFirstRender && currentUser) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <AuthLayout>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>
      <Wrapper>
        <TitleWrapper>
          <Title>Log in</Title>
          <SignupLink to="/signup">No account yet? Sign up</SignupLink>
        </TitleWrapper>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <label className="visually-hidden" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              maxLength={40}
              ref={emailRef}
            />
          </InputWrapper>
          <InputWrapper>
            <label className="visually-hidden" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              maxLength={30}
              ref={passwordRef}
            />
            <Show type="button" onClick={() => setPasswordVisible((prev) => !prev)}>
              <span className="visually-hidden">{`${
                passwordVisible ? "Hide" : "Show"
              } password`}</span>
              {passwordVisible ? <BiHide /> : <BiShow />}
            </Show>
          </InputWrapper>
          <ResetButton type="button" onClick={() => setModalOpen(true)}>
            Forgot your password?
          </ResetButton>
          <Button type="submit" disabled={signInWithEmailLoading}>
            {signInWithEmailLoading ? <Spinner light /> : "Enter"}
          </Button>
          <GoogleButton
            type="button"
            disabled={signInWithGoogleLoading}
            onClick={handleSignInWithGoogle}
          >
            {signInWithGoogleLoading ? (
              <Spinner />
            ) : (
              <>
                <FcGoogle size={20} />
                Sign up with Google
                <MdOutlineArrowForwardIos />
              </>
            )}
          </GoogleButton>
        </form>
      </Wrapper>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <ResetPassword setOpen={setModalOpen} />}
        {userModalOpen && <SetUserData setOpen={setUserModalOpen} redirect />}
      </AnimatePresence>
    </AuthLayout>
  );
};

export default Login;
