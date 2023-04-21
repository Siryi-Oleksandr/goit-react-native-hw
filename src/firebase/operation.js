import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";
import { nanoid } from "@reduxjs/toolkit";

export const savePhotoInStorage = async (photo) => {
  const response = await fetch(photo);
  const fileBlob = await response.blob();
  const uniquePhotoId = nanoid();

  ref(storage, "images");
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
