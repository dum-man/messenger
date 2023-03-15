import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { GiConversation } from "react-icons/gi";
import Header from "../Header/Header";
import MessageInput from "../MessageInput/MessageInput";
import Messages from "../Messages/Messages";
import useAppContext from "../../hooks/useAppContext";
import { conversationsState } from "../../app/atoms/conversationsState";

const Container = styled.section<{ open: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgPrimary};
  transition: background-color 0.2s;
  @media (max-width: 768px) {
    display: ${(props) => (props.open ? "none" : "flex")};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  color: ${(props) => props.theme.textPrimary};
  transition: color 0.2s;
  user-select: none;
  svg {
    font-size: 130px;
  }
`;

const Text = styled.p`
  margin-bottom: 5px;
  font-size: 26px;
  :last-of-type {
    font-size: 16px;
  }
`;

const Chat: React.FC = () => {
  const { currentConversation } = useRecoilValue(conversationsState);

  const { sidebarOpen } = useAppContext();

  return (
    <Container open={sidebarOpen}>
      <h2 className="visually-hidden">Chat</h2>
      <Header />
      {currentConversation?.id ? (
        <>
          <Messages />
          <MessageInput />
        </>
      ) : (
        <Wrapper>
          <GiConversation />
          <Text>No conversation selected</Text>
          <Text>Messages you send or receive will appear here</Text>
        </Wrapper>
      )}
    </Container>
  );
};

export default Chat;
