import { useRecoilValue } from "recoil";
import { useMediaQuery } from "usehooks-ts";
import styled from "styled-components";
import BackButton from "../BackButton/BackButton";
import Participant from "../Participant/Participant";
import ThemeButton from "../ThemeButton/ThemeButton";
import { conversationsState } from "../../../../app/atoms/conversationsState";

const Container = styled.header`
  position: relative;
  height: 75px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.bgHeader};
  border-bottom: 0.5px solid ${({ theme }) => theme.borderHeader};
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Header: React.FC = () => {
  const { currentConversation } = useRecoilValue(conversationsState);

  const isTablet = useMediaQuery("(max-width: 768px)");

  return (
    <Container>
      {currentConversation || isTablet ? (
        <Wrapper>
          <BackButton />
          <Participant />
        </Wrapper>
      ) : null}
      <ThemeButton />
    </Container>
  );
};

export default Header;
