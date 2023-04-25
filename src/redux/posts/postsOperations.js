import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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

// * #3 addComment
export const addComment = createAsyncThunk(
  "posts/addComment",
  async (comment, thunkAPI) => {
    try {
      const docRef = doc(db, "posts", comment.documentId);
      await addDoc(collection(docRef, "comments"), comment);

      return comment;
    } catch (error) {
      console.log("Error adding document: ", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// * #4 getComents(documentId)
export const getComents = createAsyncThunk(
  "posts/getComents",
  async (documentId, thunkAPI) => {
    try {
      const docRef = doc(db, "posts", documentId);
      const q = query(collection(docRef, "comments"));

      const querySnapshot = await getDocs(q);

      const result = [];
      querySnapshot.forEach((doc) => {
        const comment = doc.data();
        result.push(comment);
      });

      return result;
    } catch (error) {
      console.log("Error getting comments: ", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
