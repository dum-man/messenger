import { useEffect, useMemo, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { conversationsState } from "../../app/atoms/conversationsState";
import { messagesState } from "../../app/atoms/messagesState";
import { auth } from "../../app/firebase";
import { viewLatestMessage } from "../../app/service/messagesService";
import { Conversation, Message } from "../../types";
import { MESSAGE_SEEN_VARIANTS } from "../../app/constants";
import { setForamttedTime, setFormattedDate } from "../../utils";

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

const MessageItem = styled.li<{ sentByMe: boolean; hasSeenMessage: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.sentByMe ? "flex-end" : "flex-start")};
  padding: 5px 10px;
  transition: ${(props) =>
    props.hasSeenMessage ? "margin-bottom 0.2s" : "margin-bottom 0.001s"};
  margin-bottom: ${(props) => (props.hasSeenMessage ? "15px" : "0")};
  :last-of-type {
    padding-bottom: 0;
  }
`;

const Date = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-size: 13px;
  color: ${(props) => props.theme.textPrimary};
  transition: color 0.2s;
`;

const MessageWrapper = styled.div`
  position: relative;
  max-width: 45%;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textPrimary};
  transition: color 0.2s;
  @media (max-width: 768px) {
    max-width: 75%;
  }
`;

const MessageText = styled.p<{ sentByMe: boolean }>`
  align-self: center;
  padding: 7px 10px;
  font-size: 15px;
  color: ${(props) => (props.sentByMe ? "white" : "")};
  background-color: ${(props) =>
    props.sentByMe ? props.theme.brand100 : props.theme.bgHover};
  border-radius: 10px;
  border-bottom-left-radius: ${(props) => (props.sentByMe ? "10px" : 0)};
  border-bottom-right-radius: ${(props) => (props.sentByMe ? 0 : "10px")};
  transition: background-color 0.2s;
`;

const Time = styled.span<{ sentByMe: boolean }>`
  float: right;
  padding-top: 5px;
  padding-left: 5px;
  font-size: 10px;
`;

const MessageSeen = styled(motion.span)`
  position: absolute;
  right: 3px;
  bottom: -15px;
  font-size: 11px;
`;

const EndMark = styled.span`
  @media (max-width: 768px) {
    padding-bottom: 5px;
  }
`;

type ChatMessage = Message & {
  date?: string;
};

const Messages: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { messages } = useRecoilValue(messagesState);

  const { currentConversation } = useRecoilValue(conversationsState);

  const messagesEndRef = useRef<null | HTMLElement>(null);

  const onViewLatestMessage = async (userId: string, conversation: Conversation) => {
    try {
      if (userId === conversation.creator.uid) {
        await viewLatestMessage(conversation.id, {
          hasCreatorSeenLatestMessage: true,
        });
      } else if (userId === conversation.participant.uid) {
        await viewLatestMessage(conversation.id, {
          hasParticipantSeenLatestMessage: true,
        });
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const setMessageSeen = (message: Message, index: number) => {
    if (!currentConversation) {
      return false;
    }
    const isLatestMessage = messages[currentConversation.id].length - 1 === index;
    if (isLatestMessage && message.sender.uid === currentUser?.uid) {
      return currentConversation.creator.uid === currentUser?.uid
        ? currentConversation.hasParticipantSeenLatestMessage
        : currentConversation.hasCreatorSeenLatestMessage;
    } else {
      return false;
    }
  };

  const chatMessages = useMemo(() => {
    return (currentConversation && messages[currentConversation.id]) || [];
  }, [messages, currentConversation]);

  const formattedMessages = useMemo(() => {
    return chatMessages.reduce<ChatMessage[]>((acc, current) => {
      const date = setFormattedDate(current.createdAt);
      const hasDate = acc.find((item) => item.date === date);
      if (hasDate) {
        acc.push(current);
      } else {
        acc.push({
          date,
          ...current,
        });
      }
      return acc;
    }, []);
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
          const hasSeenMessage = setMessageSeen(message, index);
          const { id, date, sender, text, createdAt } = message;
          const sentByMe = currentUser?.uid === sender.uid;
          return (
            <MessageItem key={id} sentByMe={sentByMe} hasSeenMessage={hasSeenMessage}>
              {date ? (
                <Date>
                  <p>{date}</p>
                </Date>
              ) : null}
              <MessageWrapper>
                <MessageText sentByMe={sentByMe}>
                  {text}
                  <Time sentByMe={sentByMe}>{setForamttedTime(createdAt)}</Time>
                </MessageText>
                <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
                  {hasSeenMessage ? (
                    <MessageSeen
                      variants={MESSAGE_SEEN_VARIANTS}
                      initial="hidden"
                      animate="visible"
                    >
                      Seen
                    </MessageSeen>
                  ) : null}
                </AnimatePresence>
              </MessageWrapper>
            </MessageItem>
          );
        })}
        <EndMark ref={messagesEndRef} />
      </MessagesList>
    </Wrapper>
  );
};

export default Messages;
