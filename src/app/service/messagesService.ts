import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { SetterOrUpdater } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { MessagesState } from "./../atoms/messagesState";
import { Message, UpdatedConversation } from "../../types";
import { db } from "../firebase";

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

export const sendMessage = async (
  currentUser: User,
  conversationId: string,
  updatedConversation: UpdatedConversation
) => {
  const { uid, displayName, photoURL } = currentUser;

  const batch = writeBatch(db);

  batch.set(doc(db, `messages/${conversationId}/conversationMessages/${uuidv4()}`), {
    sender: {
      uid: uid,
      displayName: displayName,
      photoURL: photoURL,
    },
    text: updatedConversation.latestMessage.text,
    createdAt: Timestamp.now(),
  });

  batch.update(doc(db, `conversations/${conversationId}`), updatedConversation);

  await batch.commit();
};

export const viewLatestMessage = async (
  conversationId: string,
  latestMessageSeenBy: {
    hasCreatorSeenLatestMessage?: boolean;
    hasParticipantSeenLatestMessage?: boolean;
  }
) => {
  await updateDoc(doc(db, `conversations/${conversationId}`), latestMessageSeenBy);
};
