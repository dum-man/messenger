import { AnimatePresence, motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { setForamttedTime } from "../../helpers";
import { auth } from "../../../../firebase";
import { VARIANTS } from "../../constants";
import { Message } from "../../../../types";

const MessageListItem = styled.li<{ sentByMe: boolean; hasSeenMessage: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${({ sentByMe }) => (sentByMe ? "flex-end" : "flex-start")};
  padding: 5px 10px;
  transition: ${({ hasSeenMessage }) =>
    hasSeenMessage ? "margin-bottom 0.2s" : "margin-bottom 0.001s"};
  margin-bottom: ${({ hasSeenMessage }) => (hasSeenMessage ? "15px" : "0")};
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
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.2s;
`;

const MessageWrapper = styled.div`
  position: relative;
  max-width: 45%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.2s;
  @media (max-width: 768px) {
    max-width: 75%;
  }
`;

const MessageText = styled.p<{ sentByMe: boolean }>`
  align-self: center;
  padding: 7px 10px;
  font-size: 15px;
  color: ${({ sentByMe }) => (sentByMe ? "white" : "")};
  background-color: ${({ sentByMe, theme }) =>
    sentByMe ? theme.brand100 : theme.bgHover};
  border-radius: 10px;
  border-bottom-left-radius: ${({ sentByMe }) => (sentByMe ? "10px" : 0)};
  border-bottom-right-radius: ${({ sentByMe }) => (sentByMe ? 0 : "10px")};
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

interface ChatMessage extends Message {
  date?: string;
}

interface MessageItemProps {
  message: ChatMessage;
  hasSeenMessage: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, hasSeenMessage }) => {
  const [currentUser] = useAuthState(auth);

  const { date, sender, text, createdAt } = message;

  const sentByMe = currentUser?.uid === sender.uid;

  return (
    <MessageListItem sentByMe={sentByMe} hasSeenMessage={hasSeenMessage}>
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
            <MessageSeen variants={VARIANTS} initial="hidden" animate="visible">
              Seen
            </MessageSeen>
          ) : null}
        </AnimatePresence>
      </MessageWrapper>
    </MessageListItem>
  );
};

export default MessageItem;
