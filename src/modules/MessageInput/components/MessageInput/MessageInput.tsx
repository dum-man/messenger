import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { Timestamp } from "firebase/firestore";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import DeleteButton from "../DeleteButton/DeleteButton";
import SendButton from "../SendButton/SendButton";
import Textarea from "../Textarea/Textarea";
import { conversationsState } from "../../../../app/atoms/conversationsState";
import { sendMessage } from "../../api";
import { auth } from "../../../../firebase";
import { UpdatedConversation } from "../../../../types";

const MessageForm = styled.form`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 15px;
`;

const MessageInput: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const [{ currentConversation }, setConversationsState] =
    useRecoilState(conversationsState);

  const [messageText, setMessageText] = useState("");

  const onSendMessage = async () => {
    if (!messageText) {
      return;
    }
    const formattedMessageText = messageText.trim();

    if (!currentConversation || !currentUser || !formattedMessageText) {
      return;
    }
    setMessageText("");

    let updatedConversation: UpdatedConversation = {
      latestMessage: {
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        text: formattedMessageText,
      },
      updatedAt: Timestamp.now(),
      hasCreatorSeenLatestMessage: false,
      hasParticipantSeenLatestMessage: false,
    };

    if (currentUser?.uid === currentConversation.creator.uid) {
      updatedConversation = {
        ...updatedConversation,
        hasCreatorSeenLatestMessage: true,
      };
    } else {
      updatedConversation = {
        ...updatedConversation,
        hasParticipantSeenLatestMessage: true,
      };
    }
    setConversationsState((prev) => {
      const updatedConversations = [...prev.conversations];
      const updatingConversationIndex = updatedConversations.findIndex(
        (conversation) => conversation.id === currentConversation.id
      );
      const updatingConversation = updatedConversations[updatingConversationIndex];

      updatedConversations[updatingConversationIndex] = {
        ...updatingConversation,
        ...updatedConversation,
        updatedAt: Timestamp.now(),
      };
      return {
        ...prev,
        conversations: updatedConversations,
      };
    });
    try {
      await sendMessage(currentUser, currentConversation.id, updatedConversation);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.messge);
    }
  };

  return (
    <MessageForm>
      <DeleteButton />
      <Textarea
        messageText={messageText}
        setMessageText={setMessageText}
        onSendMessage={onSendMessage}
      />
      <SendButton onSendMessage={onSendMessage} />
    </MessageForm>
  );
};

export default MessageInput;
