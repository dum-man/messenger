import { motion } from "framer-motion";
import styled from "styled-components";
import { SLIDER_VARIANTS } from "../../app/constants";

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.bgPrimary};
  transition: background-color 0.2s;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

interface SliderWindowProps {
  children: React.ReactNode;
}

const SliderWindow: React.FC<SliderWindowProps> = ({ children }) => {
  return (
    <Container variants={SLIDER_VARIANTS} initial="hidden" animate="visible" exit="exit">
      {children}
    </Container>
  );
};

export default SliderWindow;
