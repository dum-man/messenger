import { getDocs, query, collection, where, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Conversation } from "../../../types";

export const getUsers = async (currentUserId: string) => {
  const userDocs = await getDocs(
    query(collection(db, "users"), where("uid", "!=", currentUserId))
  );
  const users = userDocs.docs.map((doc) => doc.data());
  return users;
};

export const createConversation = async (conversation: Conversation) => {
  await setDoc(doc(db, `conversations/${conversation.id}`), conversation);
};
