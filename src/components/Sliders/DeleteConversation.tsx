import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "usehooks-ts";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import SliderWindow from "../UI/SliderWindow";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import useAppContext from "../../hooks/useAppContext";
import { conversationsState } from "../../app/atoms/conversationsState";
import { deleteConversation } from "../../app/service/conversationsService";
import { setFormattedUser } from "../../utils";
import { auth } from "../../app/firebase";
import { RESET_VARIANTS } from "../../app/constants";
import deleteImg from "../../assets/images/delete-illustration.png";

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

const ContentWrapper = styled(motion.div)`
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
  svg {
    font-size: 70px;
    color: #4faf54;
  }
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

const DeleteConversation: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const [{ currentConversation }, setConversationsState] =
    useRecoilState(conversationsState);

  const { setSidebarOpen, setDeleteWindowOpen } = useAppContext();

  const isTablet = useMediaQuery("(max-width: 768px)");

  const [conversation, setConversation] = useState(() => currentConversation);

  const [deleting, setDeleting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onDeleteConversation = async () => {
    if (!currentConversation) {
      return;
    }
    setDeleting(true);
    try {
      await deleteConversation(currentConversation.id);
      setConversationsState((prev) => ({
        ...prev,
        currentConversation: null,
      }));
      setSuccess(true);
    } catch (error: any) {
      console.log(error.message);
      toast(error.message);
    }
    setDeleting(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (success) {
        setDeleteWindowOpen(false);
        setConversation(null);
        if (isTablet) {
          setSidebarOpen(true);
        }
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [success]);

  return (
    <SliderWindow>
      <ImageWrapper>
        <Image src={deleteImg} alt="Messages deleting" />
      </ImageWrapper>
      {success ? (
        <AnimatePresence>
          <ContentWrapper variants={RESET_VARIANTS} initial="hidden" animate="visible">
            <Content>
              <AiOutlineCheckCircle />
              <Title>Conversation deleted successfully</Title>
              <CloseButton type="button" onClick={() => setDeleteWindowOpen(false)}>
                Close
              </CloseButton>
            </Content>
          </ContentWrapper>
        </AnimatePresence>
      ) : (
        <ContentWrapper>
          <Content>
            <Title>Delete conversation?</Title>
            <Text>
              This will permanently delete the conversation <br />
              with {setFormattedUser(conversation, currentUser?.uid)?.displayName}
            </Text>
            <Button onClick={onDeleteConversation}>
              {deleting ? <Spinner light /> : "Delete"}
            </Button>
            <CloseButton onClick={() => setDeleteWindowOpen(false)}>Cancel</CloseButton>
          </Content>
        </ContentWrapper>
      )}
    </SliderWindow>
  );
};

export default DeleteConversation;
