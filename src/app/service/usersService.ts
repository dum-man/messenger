import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  updateDoc,
  setDoc,
  where,
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { User } from "firebase/auth";

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

export const createUserDocument = async (user: User) => {
  const { uid, email, displayName, photoURL } = user;

  await setDoc(doc(db, `users/${uid}`), {
    uid,
    email: email,
    displayName: displayName,
    photoURL: photoURL,
  });
};

export const updateUserProfile = async (
  selectedImage: string | null,
  displayName: string,
  user: User
) => {
  const { uid, photoURL } = user;
  let downloadURL = photoURL;

  if (selectedImage) {
    const imageRef = ref(storage, `users/${uid}/image`);
    await uploadString(imageRef, selectedImage, "data_url");
    downloadURL = await getDownloadURL(imageRef);
  }
  await updateProfile(user, {
    displayName,
    photoURL: downloadURL,
  });
  await updateDoc(doc(db, `users/${uid}`), {
    displayName,
    photoURL: downloadURL,
  });
};

export const getUsers = async (currentUserId: string) => {
  const userDocs = await getDocs(
    query(collection(db, "users"), where("uid", "!=", currentUserId))
  );
  const users = userDocs.docs.map((doc) => doc.data());
  return users;
};
