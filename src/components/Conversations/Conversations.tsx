import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "usehooks-ts";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import useAppContext from "../../hooks/useAppContext";
import setBadge from "../../utils/setBadge";
import setAvatar from "../../utils/formatAvatar";
import { conversationsState } from "../../app/atoms/conversationsState";
import { auth } from "../../app/firebase";
import { setFormattedDateTime, setFormattedUser } from "../../utils";
import { Conversation } from "../../types";
import { CONVERSATION_VARIANTS } from "../../app/constants";

const ConversationsList = styled.ul`
  overflow-y: auto;
  padding: 0 15px;
`;

const ConversationItem = styled(motion.li)<{ current: number }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  padding-left: 18px;
  color: ${(props) => (props.current ? "#ffffff" : props.theme.textPrimary)};
  background-color: ${(props) => (props.current ? props.theme.brand100 : "")};
  border-radius: 10px;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
  p:last-of-type {
    color: ${(props) => (props.current ? "#ffffff" : props.theme.textSecondary)};
    transition: color 0.2s;
  }
  :hover {
    background-color: ${(props) => (props.current ? "" : props.theme.bgHover)};
  }
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Username = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const Datetime = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-left: auto;
  font-size: 12px;
`;

const LatestMessage = styled.p`
  max-width: 230px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 768px) {
    max-width: 60vw;
  }
`;

const Conversations: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const [{ conversations, currentConversation }, setConversationsState] =
    useRecoilState(conversationsState);

  const { setSidebarOpen } = useAppContext();

  const isTablet = useMediaQuery("(max-width: 768px)");

  const onViewConversation = (conversation: Conversation) => {
    if (conversation.id === currentConversation?.id) {
      return;
    }
    setConversationsState((prev) => ({
      ...prev,
      currentConversation: conversation,
    }));
    if (isTablet) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <h2 className="visually-hidden">Conversations</h2>
      <ConversationsList>
        <AnimatePresence>
          {conversations.map((conversation) => {
            const user = setFormattedUser(conversation, currentUser?.uid);
            return (
              <ConversationItem
                key={conversation.id}
                variants={CONVERSATION_VARIANTS}
                initial="hidden"
                animate="visible"
                exit="exit"
                current={currentConversation?.id === conversation.id ? 1 : 0}
                onClick={() => onViewConversation(conversation)}
              >
                {setBadge(conversation, currentUser?.uid)}
                {setAvatar(user)}
                <UserWrapper>
                  <Username>{user?.displayName}</Username>
                  <LatestMessage>{conversation.latestMessage.text}</LatestMessage>
                </UserWrapper>
                <Datetime>{setFormattedDateTime(conversation.updatedAt)}</Datetime>
              </ConversationItem>
            );
          })}
        </AnimatePresence>
      </ConversationsList>
    </>
  );
};

export default Conversations;
