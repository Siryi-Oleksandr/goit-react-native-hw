import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "./config";
import { nanoid } from "@reduxjs/toolkit";

export const savePhotoInStorage = async (photo) => {
  const response = await fetch(photo);
  const fileBlob = await response.blob();
  const uniquePhotoId = nanoid();

  // ref(storage, "images");
  const storageRef = ref(storage, `images/${uniquePhotoId}_photo.jpg`);

  const metadata = {
    contentType: "image/jpeg",
  };

  await uploadBytes(storageRef, fileBlob, metadata);

  const urlPhoto = await getDownloadURL(
    ref(storage, `images/${uniquePhotoId}_photo.jpg`)
  );

  return urlPhoto;
};

// export const uploadPostToServer = async (userPost) => {
//   try {
//     const docRef = await addDoc(collection(db, "posts"), userPost);
//     return docRef.id;
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };
