import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Button, TextInput, PasswordInput } from "../../../../components";
import { EMAIL_FORMAT } from "../../../../app/constants";
import { auth } from "../../../../firebase";
import { signInWithGoogle } from "../../api";
import { FIREBASE_LOGIN_ERRORS } from "../../constants";
import useAppContext from "../../../../hooks/useAppContext";

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

interface LoginFormProps {
  setResetPasswordOpen: (open: React.SetStateAction<boolean>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setResetPasswordOpen }) => {
  const { setSetUserDataOpen } = useAppContext();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

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
      if (!userExists) {
        setSetUserDataOpen(true);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setSignInWithGoogleLoading(false);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Log in</Title>
        <SignupLink to="/signup">No account yet? Sign up</SignupLink>
      </TitleWrapper>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          placeholder="Your email"
          id="email"
          maxLength={40}
          inputRef={emailRef}
        />
        <PasswordInput
          id="password"
          placeholder="Password"
          maxLength={30}
          inputRef={passwordRef}
        />
        <ResetButton type="button" onClick={() => setResetPasswordOpen(true)}>
          Forgot your password?
        </ResetButton>
        <Button type="submit" variant="dark" loading={signInWithEmailLoading}>
          Enter
        </Button>
        <Button
          type="button"
          variant="light"
          loading={signInWithGoogleLoading}
          onClick={handleSignInWithGoogle}
        >
          <FcGoogle size={20} />
          Sign up with Google
          <MdOutlineArrowForwardIos />
        </Button>
      </form>
    </Wrapper>
  );
};

export default LoginForm;
