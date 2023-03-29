import { writeBatch, doc, Timestamp } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { User } from "firebase/auth";
import { db } from "../../../firebase";
import { UpdatedConversation } from "../../../types";

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
