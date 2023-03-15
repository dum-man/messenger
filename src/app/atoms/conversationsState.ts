import { atom } from "recoil";
import { Conversation } from "../../types";

export interface ConversationsState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  notificationConversation: Conversation | null;
}

const defaultConversationsState: ConversationsState = {
  conversations: [],
  currentConversation: null,
  notificationConversation: null,
};

export const conversationsState = atom<ConversationsState>({
  key: "conversationsState",
  default: defaultConversationsState,
});
