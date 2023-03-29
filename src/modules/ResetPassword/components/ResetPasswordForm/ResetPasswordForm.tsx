import { sendPasswordResetEmail } from "firebase/auth";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { Button, TextInput } from "../../../../components";
import { auth } from "../../../../firebase";
import { EMAIL_FORMAT } from "../../../../app/constants";

const Wrapper = styled.div`
  min-width: 300px;
  max-width: 450px;
  width: 90%;
  padding: 0 10px;
  color: ${({ theme }) => theme.textPrimary};
  text-align: center;
  transition: color 0.2s;
`;

const Title = styled.h2`
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 26px;
  text-align: center;
`;

const Text = styled.p`
  margin-bottom: 20px;
  text-align: center;
`;

interface ResetPasswordFormProps {
  setSuccess: (success: React.SetStateAction<boolean>) => void;
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ setSuccess, setOpen }) => {
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [resetLoading, setResetLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailRef.current) {
      console.log(emailRef.current);
      return;
    }
    const email = emailRef.current?.value.replaceAll(" ", "");

    if (!EMAIL_FORMAT.test(email)) {
      toast.error("Invalid email");
      return;
    }
    try {
      setResetLoading(true);
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setResetLoading(false);
  };

  return (
    <Wrapper>
      <Title>Recover password</Title>
      <Text>
        Enter your email to receive a link for
        <br /> password recovery
      </Text>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          id="email"
          placeholder="Your email"
          maxLength={40}
          inputRef={emailRef}
        />
        <Button type="submit" variant="dark" loading={resetLoading}>
          Recover
        </Button>
        <Button type="button" variant="light" onClick={() => setOpen(false)}>
          Close
        </Button>
      </form>
    </Wrapper>
  );
};

export default ResetPasswordForm;
