import { useRef, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import SliderWindow from "../UI/SliderWindow";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Spinner from "../UI/Spinner";
import { auth } from "../../app/firebase";
import { EMAIL_FORMAT, RESET_VARIANTS } from "../../app/constants";
import resetImg from "../../assets/images/reset-illustration.png";
import emailImg from "../../assets/images/email-illustration.png";

const ImageWrapper = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  @media (max-width: 768px) {
    width: 330px;
  }
`;

const Wrapper = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  position: relative;
  min-width: 300px;
  max-width: 450px;
  width: 90%;
  padding: 0 10px;
  color: ${({ theme }) => theme.textPrimary};
  text-align: center;
  transition: color 0.2s;
  svg {
    font-size: 70px;
    color: #4faf54;
  }
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

const InputWrapper = styled.div`
  position: relative;
  height: 55px;
  margin-bottom: 15px;
`;

const CloseButton = styled(Button)`
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.inputPrimary};
  transition: color 0.2s, background-color 0.2s;
`;

interface ResetPasswordProps {
  setOpen: (open: boolean) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ setOpen }) => {
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [resetLoading, setResetLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailRef.current) {
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
    <SliderWindow>
      {success ? (
        <AnimatePresence>
          <ImageWrapper variants={RESET_VARIANTS} initial="hidden" animate="visible">
            <Image src={emailImg} alt="Email on balloons" />
          </ImageWrapper>
          <Wrapper variants={RESET_VARIANTS} initial="hidden" animate="visible">
            <ContentWrapper>
              <AiOutlineCheckCircle />
              <Title>Email sent successfully</Title>
              <Text>
                Check your inbox. There should be an email with instructions for password
                recovery
              </Text>
              <CloseButton type="button" onClick={() => setOpen(false)}>
                Close
              </CloseButton>
            </ContentWrapper>
          </Wrapper>
        </AnimatePresence>
      ) : (
        <>
          <ImageWrapper>
            <Image src={resetImg} alt="Woman with key" />
          </ImageWrapper>
          <Wrapper>
            <ContentWrapper>
              <Title>Recover password</Title>
              <Text>
                Enter your email to receive a link for
                <br /> password recovery
              </Text>
              <form onSubmit={handleSubmit}>
                <InputWrapper>
                  <Input
                    type="email"
                    placeholder="Your email"
                    maxLength={40}
                    ref={emailRef}
                  />
                </InputWrapper>
                <Button type="submit" disabled={resetLoading}>
                  {resetLoading ? <Spinner light /> : "Recover"}
                </Button>
                <CloseButton type="button" onClick={() => setOpen(false)}>
                  Close
                </CloseButton>
              </form>
            </ContentWrapper>
          </Wrapper>
        </>
      )}
    </SliderWindow>
  );
};

export default ResetPassword;
