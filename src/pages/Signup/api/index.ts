import { setDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../../../firebase";

export const createUserDocument = async (user: User) => {
  const { uid, email, displayName, photoURL } = user;

  await setDoc(doc(db, `users/${uid}`), {
    uid,
    email: email,
    displayName: displayName,
    photoURL: photoURL,
  });
};
