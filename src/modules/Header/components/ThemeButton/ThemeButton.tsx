import styled from "styled-components";
import { ThemeToggleButton } from "../../../../components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 17px;
`;

const ThemeButton: React.FC = () => {
  return (
    <Wrapper>
      <ThemeToggleButton />
    </Wrapper>
  );
};

export default ThemeButton;
