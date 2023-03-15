import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import { Conversation } from "../types";

export const setForamttedTime = (date: Timestamp) => {
  return dayjs(date.toDate()).format("HH:mm");
};

export const setFormattedDate = (date: Timestamp) => {
  return dayjs(date.toDate()).format("ddd, D MMM");
};

export const setFormattedDateTime = (date: Timestamp) => {
  if (date.toDate().toLocaleDateString() === dayjs().toDate().toLocaleDateString()) {
    return dayjs(date.toDate()).format("HH:mm");
  }
  return dayjs(date.toDate()).format("MMM D");
};

export const setFormattedUser = (
  conversation: Conversation | null,
  userId: string | undefined
) => {
  if (!conversation) {
    return;
  }
  if (conversation.creator.uid === userId) {
    return conversation.participant;
  }
  return conversation.creator;
};

export const setHasSeenLatestMessage = (
  conversation: Conversation,
  conversationId: string | undefined,
  userId: string | undefined
) => {
  if (conversation.id === conversationId) {
    return;
  }
  if (conversation.creator.uid === userId) {
    if (!conversation.hasCreatorSeenLatestMessage) {
      return true;
    } else {
      return false;
    }
  }
  if (conversation.hasParticipantSeenLatestMessage) {
    return false;
  } else {
    return true;
  }
};
