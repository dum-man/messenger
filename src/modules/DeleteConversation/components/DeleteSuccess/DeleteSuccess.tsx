import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styled from "styled-components";
import { Button } from "../../../../components";
import useAppContext from "../../../../hooks/useAppContext";
import { VARIANTS } from "../../constants";

const Wrapper = styled(motion.div)`
  width: 90%;
  min-width: 300px;
  max-width: 425px;
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

const DeleteSuccess: React.FC = () => {
  const { setDeleteWindowOpen } = useAppContext();

  return (
    <Wrapper variants={VARIANTS} initial="hidden" animate="visible">
      <AiOutlineCheckCircle />
      <Title>Conversation deleted successfully</Title>
      <Button type="button" variant="light" onClick={() => setDeleteWindowOpen(false)}>
        Close
      </Button>
    </Wrapper>
  );
};

export default DeleteSuccess;
