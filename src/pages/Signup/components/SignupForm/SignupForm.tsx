import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Button, TextInput, PasswordInput } from "../../../../components";
import { createUserDocument } from "../../api";
import { auth } from "../../../../firebase";
import { EMAIL_FORMAT } from "../../../../app/constants";
import { FIREBASE_REGISTER_ERROR } from "../../constants";
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

const LoginLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.textPrimary};
  text-decoration: none;
  transition: color 0.2s;
  :hover {
    text-decoration: underline;
  }
`;

const Form = styled.form`
  div {
    :last-of-type {
      margin-bottom: 30px;
    }
  }
`;

const SignupForm: React.FC = () => {
  const { setSetUserDataOpen } = useAppContext();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmedPasswordRef = useRef<HTMLInputElement | null>(null);

  const [userCreating, setUserCreating] = useState(false);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!emailRef.current || !passwordRef.current || !confirmedPasswordRef.current) {
      return;
    }
    const email = emailRef.current?.value.replaceAll(" ", "").toLowerCase();
    const password = passwordRef.current?.value.replaceAll(" ", "");
    const confirmPassword = confirmedPasswordRef.current?.value.replaceAll(" ", "");

    if (!EMAIL_FORMAT.test(email)) {
      toast.error("Invalid email");
      return;
    }
    if (password.length < 6) {
      toast.error("Password is too short");
      return;
    }
    if (password.length !== confirmPassword.length) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      setUserCreating(true);
      const data = await createUserWithEmailAndPassword(auth, email, password);
      if (data) {
        await createUserDocument(data.user);
        setSetUserDataOpen(true);
      } else {
        throw new Error("Account creation failed");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(
        FIREBASE_REGISTER_ERROR[error.message as keyof typeof FIREBASE_REGISTER_ERROR] ||
          error.message
      );
    }
    setUserCreating(false);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Sign up</Title>
        <LoginLink to="/login">Have an account? Log in</LoginLink>
      </TitleWrapper>
      <Form onSubmit={handleSubmit}>
        <TextInput
          id="email"
          type="email"
          placeholder="Your email"
          maxLength={40}
          inputRef={emailRef}
        />
        <PasswordInput
          id="password"
          placeholder="Password"
          maxLength={30}
          inputRef={passwordRef}
        />
        <PasswordInput
          id="confirmedPassword"
          placeholder="Confirm password"
          maxLength={30}
          inputRef={confirmedPasswordRef}
        />
        <Button type="submit" variant="dark" loading={userCreating}>
          Next
        </Button>
      </Form>
    </Wrapper>
  );
};

export default SignupForm;
