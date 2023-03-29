import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { SetterOrUpdater } from "recoil";
import { db } from "../../firebase";
import { ConversationsState } from "../atoms/conversationsState";
import { MessagesState } from "../atoms/messagesState";
import { Conversation, Message } from "../../types";

export const getConversations = (
  userId: string | undefined,
  setConversationsStateValue: SetterOrUpdater<ConversationsState>
) => {
  const q = query(
    collection(db, "conversations"),
    where("participantIds", "array-contains", userId),
    orderBy("updatedAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const conversations = querySnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })) as Conversation[];

    setConversationsStateValue((prev) => {
      const currentConversation = conversations.find(
        (item) => item.id === prev.currentConversation?.id
      );
      return {
        ...prev,
        conversations,
        currentConversation: currentConversation || null,
      };
    });
  });

  return () => unsubscribe();
};

export const getMessages = (
  conversationId: string,
  setMessagesStateValue: SetterOrUpdater<MessagesState>
) => {
  const q = query(
    collection(db, `messages/${conversationId}/conversationMessages`),
    orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((item) => ({
      id: item.id,
      conversationId: conversationId,
      ...item.data(),
    }));

    setMessagesStateValue((prev) => ({
      messages: {
        ...prev.messages,
        [conversationId]: messages as Message[],
      },
    }));
  });

  return () => unsubscribe();
};
