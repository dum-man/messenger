import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, runTransaction } from "firebase/firestore";
import { auth, db } from "../../../firebase";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, provider);

  if (data) {
    const { uid, email, displayName, photoURL } = data.user;
    const userDocRef = doc(db, `users/${uid}`);
    const userExists = await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userDocRef);
      if (userDoc.exists()) {
        return true;
      } else {
        transaction.set(userDocRef, {
          uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        });
        return false;
      }
    });
    return userExists;
  } else {
    throw new Error("Account creation failed");
  }
};
