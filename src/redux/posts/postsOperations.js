import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { storage, db } from "../../firebase/config";

// * #1 addPost
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

// * #2 getPosts(userId)
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (userId, thunkAPI) => {
    try {
      const q = query(collection(db, "posts"), where("userId", "==", userId));

      const querySnapshot = await getDocs(q);

      const result = [];
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        post.documentId = doc.id;
        result.push(post);
      });

      return result;
    } catch (error) {
      console.log("Error getting posts: ", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
