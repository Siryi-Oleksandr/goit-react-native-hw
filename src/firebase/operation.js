import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  getCountFromServer,
} from "firebase/firestore";
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

export const getNumberComents = async (documentId) => {
  try {
    const docRef = doc(db, "posts", documentId);
    const coll = collection(docRef, "comments");
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  } catch (error) {
    console.log("Error count comments: ", error.message);
  }
};
