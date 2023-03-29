import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "usehooks-ts";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import ConversationItem from "../ConversationItem/ConversationItem";
import useAppContext from "../../../../hooks/useAppContext";
import { setFormattedUser } from "../../../../utils";
import { conversationsState } from "../../../../app/atoms/conversationsState";
import { auth } from "../../../../firebase";
import { Conversation } from "../../../../types";

const ConversationsList = styled.ul`
  overflow-y: auto;
  padding: 0 15px;
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
                conversation={conversation}
                user={user}
                onViewConversation={onViewConversation}
              />
            );
          })}
        </AnimatePresence>
      </ConversationsList>
    </>
  );
};

export default Conversations;
