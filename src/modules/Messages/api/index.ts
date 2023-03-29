import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

export const viewLatestMessage = async (
  conversationId: string,
  latestMessageSeenBy: {
    hasCreatorSeenLatestMessage?: boolean;
    hasParticipantSeenLatestMessage?: boolean;
  }
) => {
  await updateDoc(doc(db, `conversations/${conversationId}`), latestMessageSeenBy);
};
