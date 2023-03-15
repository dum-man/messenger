import { Conversation } from "../types";

export const setHasLatestMessageSeen = (
  conversation: Conversation,
  conversationId: string | undefined,
  userId: string | undefined
) => {
  if (conversation.id === conversationId) {
    return;
  }
  if (conversation.creator.uid === userId && !conversation.hasCreatorSeenLatestMessage) {
    return true;
  } else if (!conversation.hasParticipantSeenLatestMessage) {
    return true;
  }
};
