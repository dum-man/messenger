import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export interface Conversation {
  id: string;
  creator: ChatUser;
  participant: ChatUser;
  participantIds: string[];
  latestMessage: LatestMessage;
  hasCreatorSeenLatestMessage: boolean;
  hasParticipantSeenLatestMessage: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: ChatUser;
  text: string;
  createdAt: Timestamp;
}

export type ChatUser = Pick<User, "uid" | "displayName" | "photoURL">;

export type UpdatedConversation = Pick<
  Conversation,
  | "latestMessage"
  | "updatedAt"
  | "hasCreatorSeenLatestMessage"
  | "hasParticipantSeenLatestMessage"
>;

export type LatestMessage = Pick<User, "displayName" | "photoURL"> & {
  text: string | null;
};
