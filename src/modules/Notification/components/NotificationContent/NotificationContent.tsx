import { useRecoilState } from "recoil";
import { useMediaQuery } from "usehooks-ts";
import styled from "styled-components";
import { Avatar } from "../../../../ui";
import { conversationsState } from "../../../../app/atoms/conversationsState";
import useAppContext from "../../../../hooks/useAppContext";

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

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Text = styled.p`
  width: 215px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
`;

const NotificationContent: React.FC = () => {
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
    <Wrapper onClick={onViewConversation}>
      <Avatar user={notificationConversation?.latestMessage} />
      <NotificationWrapper>
        <p>{notificationConversation?.latestMessage.displayName}</p>
        {notificationConversation?.latestMessage.text ? (
          <Text>{notificationConversation?.latestMessage.text}</Text>
        ) : (
          <Text>Started conversation with you</Text>
        )}
      </NotificationWrapper>
    </Wrapper>
  );
};

export default NotificationContent;
