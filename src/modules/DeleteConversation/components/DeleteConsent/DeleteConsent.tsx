import { useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Button } from "../../../../components";
import useAppContext from "../../../../hooks/useAppContext";
import { deleteConversation } from "../../api";
import { setFormattedUser } from "../../../../utils";
import { conversationsState } from "../../../../app/atoms/conversationsState";
import { auth } from "../../../../firebase";

const Wrapper = styled.div`
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
  span {
    font-weight: 700;
  }
`;

interface DeleteConsentProps {
  setSuccess: (success: React.SetStateAction<boolean>) => void;
}

const DeleteConsent: React.FC<DeleteConsentProps> = ({ setSuccess }) => {
  const [currentUser] = useAuthState(auth);

  const { setDeleteWindowOpen } = useAppContext();

  const [{ currentConversation }, setConversationsState] =
    useRecoilState(conversationsState);

  const conversation = useMemo(() => {
    return currentConversation;
  }, []);

  const [deleting, setDeleting] = useState(false);

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

  return (
    <Wrapper>
      <Title>Delete conversation?</Title>
      <Text>
        This will permanently delete the conversation <br />
        with <span>{setFormattedUser(conversation, currentUser?.uid)?.displayName}</span>
      </Text>
      <Button
        type="button"
        variant="dark"
        loading={deleting}
        onClick={onDeleteConversation}
      >
        Delete
      </Button>
      <Button type="button" variant="light" onClick={() => setDeleteWindowOpen(false)}>
        Cancel
      </Button>
    </Wrapper>
  );
};

export default DeleteConsent;
