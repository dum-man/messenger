import { Conversation } from "../../../types";

export const getLatestConversation = (
  conversations: Conversation[],
  userId: string | undefined
) => {
  return conversations.find((conversation) =>
    conversation.creator.uid === userId
      ? !conversation.hasCreatorSeenLatestMessage
      : !conversation.hasParticipantSeenLatestMessage
  );
};
