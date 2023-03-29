import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";
import { SliderWindow, Image } from "../../../../ui";
import LogoutConsent from "../LogoutConsent/LogoutConsent";
import { conversationsState } from "../../../../app/atoms/conversationsState";
import { messagesState } from "../../../../app/atoms/messagesState";
import { auth } from "../../../../firebase";
import leaveImg from "../../../../assets/images/leave-illustration.png";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface ConsentScreenProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
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
      <Image src={leaveImg} alt="Man leaving" />
      <Wrapper>
        <LogoutConsent onSignout={onSignout} setOpen={setOpen} />
      </Wrapper>
    </SliderWindow>
  );
};

export default ConsentScreen;
