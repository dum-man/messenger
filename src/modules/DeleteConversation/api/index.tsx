import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

export const deleteConversation = async (conversationId: string) => {
  await deleteDoc(doc(db, "conversations", conversationId));
};
