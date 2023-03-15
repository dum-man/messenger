import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "usehooks-ts";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import ThemeToggle from "../UI/ThemeToggle";
import useAppContext from "../../hooks/useAppContext";
import { conversationsState } from "../../app/atoms/conversationsState";
import { auth } from "../../app/firebase";
import { setFormattedUser, setHasSeenLatestMessage } from "../../utils";

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

const ThemeButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 17px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BackButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 20px;
  color: ${(props) => props.theme.textPrimary};
  border-radius: 50%;
  transition: color 0.2s;
`;

const Participant = styled.p`
  span {
    margin-right: 10px;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const NumberOfMsg = styled.span`
  position: absolute;
  top: 0;
  left: 3px;
  width: 13px;
  height: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: #ffffff;
  background-color: ${({ theme }) => theme.brand100};
  border-radius: 50%;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Header: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const [{ conversations, currentConversation }, setConversationsState] =
    useRecoilState(conversationsState);

  const { setSidebarOpen } = useAppContext();

  const isTablet = useMediaQuery("(max-width: 768px)");

  const numberOfUnseenLatestMessages = useMemo(() => {
    return conversations.filter((conversation) =>
      setHasSeenLatestMessage(conversation, currentConversation?.id, currentUser?.uid)
    ).length;
  }, [conversations]);

  const resetCurrentConversationState = () => {
    if (currentConversation) {
      setConversationsState((prev) => ({
        ...prev,
        currentConversation: null,
      }));
    }
    if (isTablet) {
      setSidebarOpen(true);
    }
  };

  return (
    <Container>
      {currentConversation || isTablet ? (
        <Wrapper>
          <BackButton onClick={resetCurrentConversationState}>
            {numberOfUnseenLatestMessages ? (
              <NumberOfMsg>{numberOfUnseenLatestMessages}</NumberOfMsg>
            ) : null}
            <IoIosArrowBack />
          </BackButton>
          <Participant>
            <span>To:</span>
            {setFormattedUser(currentConversation, currentUser?.uid)?.displayName}
          </Participant>
        </Wrapper>
      ) : null}
      <ThemeButtonWrapper>
        <ThemeToggle />
      </ThemeButtonWrapper>
    </Container>
  );
};

export default Header;
