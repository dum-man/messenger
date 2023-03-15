import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useIsFirstRender } from "usehooks-ts";
import styled from "styled-components";
import toast from "react-hot-toast";
import { BiHide, BiShow } from "react-icons/bi";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";
import ThemeToggle from "../../components/UI/ThemeToggle";
import { createUserDocument } from "../../app/service/usersService";
import { auth } from "../../app/firebase";
import { EMAIL_FORMAT, FIREBASE_REGISTER_ERROR } from "../../app/constants";

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

const LoginLink = styled(Link)`
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
  :last-of-type {
    margin-bottom: 30px;
  }
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

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser] = useAuthState(auth);
  const isFirstRender = useIsFirstRender();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmedPasswordRef = useRef<HTMLInputElement | null>(null);

  const [userCreating, setUserCreating] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirmedPassword: false,
  });

  const handleSetPasswordVisible = (type: "password" | "confirmedPassword") => {
    setPasswordVisible((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

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
      } else {
        throw new Error("Account creation failed");
      }
      navigate("/", { replace: true });
    } catch (error: any) {
      console.log(error.message);
      toast.error(
        FIREBASE_REGISTER_ERROR[error.message as keyof typeof FIREBASE_REGISTER_ERROR] ||
          error.message
      );
    }
    setUserCreating(false);
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
          <Title>Sign up</Title>
          <LoginLink to="/login">Have an account? Log in</LoginLink>
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
              type={passwordVisible.password ? "text" : "password"}
              placeholder="Password"
              maxLength={30}
              ref={passwordRef}
            />
            <Show type="button" onClick={() => handleSetPasswordVisible("password")}>
              <span className="visually-hidden">{`${
                passwordVisible.password ? "Hide" : "Show"
              } password`}</span>
              {passwordVisible.password ? <BiHide /> : <BiShow />}
            </Show>
          </InputWrapper>
          <InputWrapper>
            <label className="visually-hidden" htmlFor="confirmed-password">
              Confirm password
            </label>
            <Input
              id="confirmed-password"
              type={passwordVisible.confirmedPassword ? "text" : "password"}
              placeholder="Confirm password"
              maxLength={30}
              ref={confirmedPasswordRef}
            />
            <Show
              type="button"
              onClick={() => handleSetPasswordVisible("confirmedPassword")}
            >
              <span className="visually-hidden">{`${
                passwordVisible.confirmedPassword ? "Hide" : "Show"
              } password`}</span>
              {passwordVisible.confirmedPassword ? <BiHide /> : <BiShow />}
            </Show>
          </InputWrapper>
          <Button type="submit">{userCreating ? <Spinner light /> : "Next"}</Button>
        </form>
      </Wrapper>
    </AuthLayout>
  );
};

export default Signup;
