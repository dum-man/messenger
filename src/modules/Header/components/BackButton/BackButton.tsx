import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "usehooks-ts";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import useAppContext from "../../../../hooks/useAppContext";
import { conversationsState } from "../../../../app/atoms/conversationsState";
import { setHasSeenLatestMessage } from "../../helpers";
import { auth } from "../../../../firebase";

const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 20px;
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 50%;
  transition: color 0.2s;
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

const BackButton: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const isTablet = useMediaQuery("(max-width: 768px)");

  const [{ conversations, currentConversation }, setConversationsState] =
    useRecoilState(conversationsState);

  const { setSidebarOpen } = useAppContext();

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
    <Button onClick={resetCurrentConversationState}>
      {numberOfUnseenLatestMessages ? (
        <NumberOfMsg>{numberOfUnseenLatestMessages}</NumberOfMsg>
      ) : null}
      <IoIosArrowBack />
    </Button>
  );
};

export default BackButton;
