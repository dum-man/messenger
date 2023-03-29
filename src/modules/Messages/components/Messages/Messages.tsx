import { useEffect, useMemo, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import MessageItem from "../MessageItem/MessageItem";
import { getFormattedMessages, onViewLatestMessage, setMessageSeen } from "../../helpers";
import { conversationsState } from "../../../../app/atoms/conversationsState";
import { messagesState } from "../../../../app/atoms/messagesState";
import { auth } from "../../../../firebase";

const Wrapper = styled.div`
  flex: 1;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const MessagesList = styled.ul`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-self: normal;
  padding: 0 5px;
`;

const EndMark = styled.span`
  @media (max-width: 768px) {
    padding-bottom: 5px;
  }
`;

const Messages: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { messages } = useRecoilValue(messagesState);

  const { currentConversation } = useRecoilValue(conversationsState);

  const messagesEndRef = useRef<null | HTMLElement>(null);

  const chatMessages = useMemo(() => {
    return (currentConversation && messages[currentConversation.id]) || [];
  }, [messages, currentConversation]);

  const formattedMessages = useMemo(() => {
    return getFormattedMessages(chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    if (!currentUser || !currentConversation) {
      return;
    }
    if (formattedMessages[formattedMessages.length - 1]?.sender.uid !== currentUser.uid) {
      onViewLatestMessage(currentUser.uid, currentConversation);
    }
  }, [messages]);

  useEffect(() => {
    if (typeof messagesEndRef.current?.scrollIntoView === "function") {
      messagesEndRef.current?.scrollIntoView();
    }
  }, [messages, currentConversation]);

  return (
    <Wrapper>
      <h3 className="visually-hidden">Messages</h3>
      <MessagesList>
        {formattedMessages.map((message, index) => {
          const isLatestMessage =
            messages[currentConversation?.id as string].length - 1 === index;
          const hasSeenMessage = setMessageSeen(
            isLatestMessage,
            currentUser?.uid,
            currentConversation,
            message
          );
          return (
            <MessageItem
              key={message.id}
              message={message}
              hasSeenMessage={hasSeenMessage}
            />
          );
        })}
        <EndMark ref={messagesEndRef} />
      </MessagesList>
    </Wrapper>
  );
};

export default Messages;
