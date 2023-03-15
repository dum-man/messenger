import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";
import SliderWindow from "../UI/SliderWindow";
import Button from "../UI/Button";
import { auth } from "../../app/firebase";
import { conversationsState } from "../../app/atoms/conversationsState";
import { messagesState } from "../../app/atoms/messagesState";
import leaveImg from "../../assets/images/leave-illustration.png";

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  min-width: 300px;
  width: 100%;
  @media (max-width: 768px) {
    width: 330px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 90%;
  min-width: 300px;
  max-width: 425px;
  padding: 0 10px;
  color: ${({ theme }) => theme.textPrimary};
  text-align: center;
  transition: color 0.2s;
`;

const Title = styled.h2`
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 26px;
  text-align: center;
`;

const Text = styled.p`
  margin-bottom: 20px;
`;

const CloseButton = styled(Button)`
  color: ${({ theme }) => theme.textPrimary};
  background-color: ${({ theme }) => theme.inputPrimary};
  transition: color 0.2s, background-color 0.2s;
`;

interface ConsentScreenProps {
  setOpen: (open: boolean) => void;
}

const ConsentScreen: React.FC<ConsentScreenProps> = ({ setOpen }) => {
  const navigate = useNavigate();

  const resetConversationsState = useResetRecoilState(conversationsState);
  const resetMessagesState = useResetRecoilState(messagesState);

  const onSignout = async () => {
    try {
      await signOut(auth);
      resetConversationsState();
      resetMessagesState();
      navigate("/login", { replace: true });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <SliderWindow>
      <ImageWrapper>
        <Image src={leaveImg} alt="Man leaving" />
      </ImageWrapper>
      <ContentWrapper>
        <Content>
          <Title>Logout</Title>
          <Text>Are you sure you want to leave?</Text>
          <Button onClick={onSignout}>Log out</Button>
          <CloseButton onClick={() => setOpen(false)}>Close</CloseButton>
        </Content>
      </ContentWrapper>
    </SliderWindow>
  );
};

export default ConsentScreen;
