import { useRecoilState } from "recoil";
import { useMediaQuery } from "usehooks-ts";
import styled from "styled-components";
import { motion } from "framer-motion";
import useAppContext from "../../hooks/useAppContext";
import setAvatar from "../../utils/formatAvatar";
import { conversationsState } from "../../app/atoms/conversationsState";
import { NEW_MESSAGE_VARIANTS } from "../../app/constants";

const Container = styled(motion.div)`
  position: fixed;
  top: 30px;
  left: calc(50% - 150px);
  z-index: 10;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 300px;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  color: ${({ theme }) => theme.textPrimary};
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 4px 32px rgb(0 0 0 / 16%);
  cursor: pointer;
  transition: transform 0.3s;
  :active {
    transform: scale(0.95);
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Message = styled.p`
  width: 215px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
`;

const Notification: React.FC = () => {
  const [{ notificationConversation }, setConversationsState] =
    useRecoilState(conversationsState);

  const { setSidebarOpen } = useAppContext();

  const isTablet = useMediaQuery("(max-width: 768px)");

  const onViewConversation = () => {
    setConversationsState((prev) => ({
      ...prev,
      currentConversation: notificationConversation,
    }));
    if (isTablet) {
      setSidebarOpen(false);
    }
  };

  return (
    <Container
      variants={NEW_MESSAGE_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h3 className="visually-hidden">Notification</h3>
      <Wrapper onClick={onViewConversation}>
        {setAvatar(notificationConversation?.latestMessage)}
        <MessageWrapper>
          <p>{notificationConversation?.latestMessage.displayName}</p>
          {notificationConversation?.latestMessage.text ? (
            <Message>{notificationConversation?.latestMessage.text}</Message>
          ) : (
            <Message>Started conversation with you</Message>
          )}
        </MessageWrapper>
      </Wrapper>
    </Container>
  );
};

export default Notification;
