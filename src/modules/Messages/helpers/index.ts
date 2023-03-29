import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Timestamp } from "firebase/firestore";
import { Conversation, Message } from "../../../types";
import { setFormattedDate } from "../../../utils";
import { viewLatestMessage } from "../api";

interface ChatMessage extends Message {
  date?: string;
}

export const setForamttedTime = (date: Timestamp) => {
  return dayjs(date.toDate()).format("HH:mm");
};

export const setMessageSeen = (
  isLatestMessage: boolean,
  userId: string | undefined,
  currentConversation: Conversation | null,
  message: Message
) => {
  if (!currentConversation) {
    return false;
  }

  if (isLatestMessage && message.sender.uid === userId) {
    return currentConversation.creator.uid === userId
      ? currentConversation.hasParticipantSeenLatestMessage
      : currentConversation.hasCreatorSeenLatestMessage;
  } else {
    return false;
  }
};

export const onViewLatestMessage = async (userId: string, conversation: Conversation) => {
  try {
    if (userId === conversation.creator.uid) {
      await viewLatestMessage(conversation.id, {
        hasCreatorSeenLatestMessage: true,
      });
    } else if (userId === conversation.participant.uid) {
      await viewLatestMessage(conversation.id, {
        hasParticipantSeenLatestMessage: true,
      });
    }
  } catch (error: any) {
    console.log(error.message);
    toast.error(error.message);
  }
};

export const getFormattedMessages = (messages: Message[]) => {
  return messages.reduce<ChatMessage[]>((acc, current) => {
    const date = setFormattedDate(current.createdAt);
    const hasDate = acc.find((item) => item.date === date);
    if (hasDate) {
      acc.push(current);
    } else {
      acc.push({
        date,
        ...current,
      });
    }
    return acc;
  }, []);
};
