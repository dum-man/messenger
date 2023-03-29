import { User, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage, db } from "../../../firebase";

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
