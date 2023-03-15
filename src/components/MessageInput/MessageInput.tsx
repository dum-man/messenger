import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Timestamp } from "firebase/firestore";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdArrowRoundUp } from "react-icons/io";
import useAppContext from "../../hooks/useAppContext";
import { auth } from "../../app/firebase";
import { conversationsState } from "../../app/atoms/conversationsState";
import { sendMessage } from "../../app/service/messagesService";
import { UpdatedConversation } from "../../types";

const MessageForm = styled.form`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 15px;
`;

const GrowWrapper = styled.div`
  flex: 1;
  display: grid;
  ::after {
    content: attr(data-replicated-value) " ";
    max-height: 130px;
    grid-area: 1 / 1 / 2 / 2;
    padding: 5px 10px;
    font-family: inherit;
    font-size: 15px;
    color: ${({ theme }) => theme.textPrimary};
    background-color: transparent;
    border: 0.5px solid ${({ theme }) => theme.borderPrimary};
    border-radius: 15px;
    white-space: pre-wrap;
    visibility: hidden;
    word-break: break-all;
    transition: color 0.2s, border-color 0.2s;
  }
`;

const Textarea = styled.textarea`
  max-height: 150px;
  grid-area: 1 / 1 / 2 / 2;
  margin: 0;
  padding: 5px 10px;
  font-family: inherit;
  font-size: 15px;
  color: ${({ theme }) => theme.textPrimary};
  border: 0.5px solid ${({ theme }) => theme.borderPrimary};
  border-radius: 15px;
  resize: none;
  background-color: transparent;
  outline: none;
  word-break: break-all;
  transition: color 0.2s, border-color 0.2s;
  ::placeholder {
    opacity: 0.5;
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 30px;
  height: 30px;
  padding: 0;
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 50%;
  transition: color 0.2s, transform 0.1s;
  &:active {
    transform: scale(0.9);
  }
`;

const SendButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  padding: 0;
  width: 30px;
  height: 30px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.brand100};
  border-radius: 50%;
  transition: transform 0.1s;
  svg {
    color: #ffffff;
    border-radius: 50%;
  }
  :active {
    transform: scale(0.9);
  }
`;

const MessageInput: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const [{ currentConversation }, setConversationsState] =
    useRecoilState(conversationsState);

  const { setDeleteWindowOpen } = useAppContext();

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

  const onKeyDown = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.key === "Enter" && !evt.shiftKey) {
      evt.preventDefault();
      onSendMessage();
    }
  };

  return (
    <MessageForm>
      <DeleteButton type="button" onClick={() => setDeleteWindowOpen(true)}>
        <span className="visually-hidden">Delete conversation</span>
        <AiOutlineDelete />
      </DeleteButton>
      <GrowWrapper className="grow-wrap" data-replicated-value={messageText}>
        <Textarea
          rows={1}
          maxLength={5000}
          placeholder="Message"
          value={messageText}
          onChange={(evt) => setMessageText(evt.target.value)}
          onKeyDown={onKeyDown}
        />
      </GrowWrapper>
      <SendButton type="button" onClick={onSendMessage}>
        <span className="visually-hidden">Send message</span>
        <IoMdArrowRoundUp />
      </SendButton>
    </MessageForm>
  );
};

export default MessageInput;
