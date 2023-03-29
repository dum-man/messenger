import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Image, SliderWindow } from "../../../../ui";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";
import ResetSuccess from "../ResetSuccess/ResetSuccess";
import { VARIANTS } from "../../constants";
import emailImg from "../../../../assets/images/email-illustration.png";
import resetImg from "../../../../assets/images/reset-illustration.png";

const ImageWrapper = styled(motion.div)`
  flex: 1;
  display: flex;
`;

const Wrapper = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface ResetPasswordProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ setOpen }) => {
  const [success, setSuccess] = useState(false);

  return (
    <SliderWindow>
      {success ? (
        <>
          <ImageWrapper variants={VARIANTS} initial="hidden" animate="visible">
            <Image src={emailImg} alt="Email on balloons" />
          </ImageWrapper>
          <ResetSuccess setOpen={setOpen} />
        </>
      ) : (
        <>
          <Image src={resetImg} alt="Woman with key" />
          <Wrapper>
            <ResetPasswordForm setSuccess={setSuccess} setOpen={setOpen} />
          </Wrapper>
        </>
      )}
    </SliderWindow>
  );
};

export default ResetPassword;
