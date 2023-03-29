import styled from "styled-components";
import { ThemeToggleButton } from "../../../../components";

const Wrapper = styled.div`
  position: absolute;
  top: 17px;
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
