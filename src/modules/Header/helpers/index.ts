import { Conversation } from "../../../types";

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
