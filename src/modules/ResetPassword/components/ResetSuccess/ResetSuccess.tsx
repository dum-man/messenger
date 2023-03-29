import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { Button } from "../../../../components";
import { VARIANTS } from "../../constants";

const Wrapper = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
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

interface ResetSuccessProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const ResetSuccess: React.FC<ResetSuccessProps> = ({ setOpen }) => {
  return (
    <Wrapper variants={VARIANTS} initial="hidden" animate="visible">
      <ContentWrapper>
        <AiOutlineCheckCircle />
        <Title>Email sent successfully</Title>
        <Text>
          Check your inbox. There should be an email with instructions for password
          recovery
        </Text>
        <Button type="button" variant="light" onClick={() => setOpen(false)}>
          Close
        </Button>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ResetSuccess;
