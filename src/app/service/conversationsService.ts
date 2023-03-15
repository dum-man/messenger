import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { SetterOrUpdater } from "recoil";
import { Conversation } from "../../types";
import { db } from "../firebase";
import { ConversationsState } from "../atoms/conversationsState";

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

export const createConversation = async (conversation: Conversation) => {
  await setDoc(doc(db, `conversations/${conversation.id}`), conversation);
};

export const deleteConversation = async (conversationId: string) => {
  await deleteDoc(doc(db, "conversations", conversationId));
};
