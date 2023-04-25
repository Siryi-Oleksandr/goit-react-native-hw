import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/config";

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), post);
      post.documentId = docRef.id;

      return post;
    } catch (error) {
      console.log("Error adding document: ", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const uploadPostToServer = async (userPost) => {
//   try {
//     const docRef = await addDoc(collection(db, "posts"), userPost);
//     return docRef.id;
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };
