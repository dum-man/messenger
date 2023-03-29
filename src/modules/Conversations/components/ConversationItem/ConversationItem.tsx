import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Avatar } from "../../../../ui";
import setBadge from "../../helpers/setBadge";
import { conversationsState } from "../../../../app/atoms/conversationsState";
import { setFormattedDateTime } from "../../helpers";
import { auth } from "../../../../firebase";
import { VARIANTS } from "../../constants";
import { ChatUser, Conversation } from "../../../../types";

const ConversationListItem = styled(motion.li)<{ current: number }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  padding-left: 18px;
  color: ${({ current, theme }) => (current ? "#ffffff" : theme.textPrimary)};
  background-color: ${({ current, theme }) => (current ? theme.brand100 : "")};
  border-radius: 10px;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
  p:last-of-type {
    color: ${({ current, theme }) => (current ? "#ffffff" : theme.textSecondary)};
    transition: color 0.2s;
  }
  :hover {
    background-color: ${({ current, theme }) => (current ? "" : theme.bgHover)};
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

interface ConversationItemProps {
  conversation: Conversation;
  user: ChatUser | undefined;
  onViewConversation: (conversation: Conversation) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  user,
  onViewConversation,
}) => {
  const [currentUser] = useAuthState(auth);

  const { currentConversation } = useRecoilValue(conversationsState);

  return (
    <ConversationListItem
      variants={VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      current={currentConversation?.id === conversation.id ? 1 : 0}
      onClick={() => onViewConversation(conversation)}
    >
      {setBadge(conversation, currentUser?.uid)}
      <Avatar user={user} />
      <UserWrapper>
        <Username>{user?.displayName}</Username>
        <LatestMessage>{conversation.latestMessage.text}</LatestMessage>
      </UserWrapper>
      <Datetime>{setFormattedDateTime(conversation.updatedAt)}</Datetime>
    </ConversationListItem>
  );
};

export default ConversationItem;
