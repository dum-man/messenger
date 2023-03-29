import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import { Conversation } from "../types";

export const setFormattedDate = (date: Timestamp) => {
  return dayjs(date.toDate()).format("ddd, D MMM");
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
