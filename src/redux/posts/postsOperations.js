import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  doc,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { showMessage } from "react-native-flash-message";

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
      showMessage({
        message: "Error adding document",
        description: error.message,
        type: "danger",
      });
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

      querySnapshot.forEach(async (docum) => {
        const post = docum.data();
        post.documentId = docum.id;

        result.push(post);
      });

      return result;
    } catch (error) {
      console.log("Error getting posts: ", error.message);
      showMessage({
        message: "Error getting posts",
        description: error.message,
        type: "danger",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// * #3 getAllPosts()
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));

      const result = [];
      querySnapshot.forEach((docum) => {
        const post = docum.data();
        post.documentId = docum.id;

        result.push(post);
      });

      return result;
    } catch (error) {
      console.log("Error getting all posts: ", error.message);
      showMessage({
        message: "Error getting all posts",
        description: error.message,
        type: "danger",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// * #4 addComment
export const addComment = createAsyncThunk(
  "posts/addComment",
  async (comment, thunkAPI) => {
    try {
      const docRef = doc(db, "posts", comment.documentId);
      await addDoc(collection(docRef, "comments"), comment);

      return comment;
    } catch (error) {
      console.log("Error adding comment: ", error.message);
      showMessage({
        message: "Error adding comment",
        description: error.message,
        type: "danger",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// * #5 getComents(documentId)
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

// * #6 toggleLike(likeObj)
export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async (likeObj, thunkAPI) => {
    try {
      const docRef = doc(db, "posts", likeObj.documentId);
      await setDoc(doc(docRef, "likes", likeObj.userId), likeObj);

      // return likeObj;
    } catch (error) {
      console.log("Error add like or dislike: ", error.message);
      showMessage({
        message: "Error add like or dislike",
        description: error.message,
        type: "danger",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// * #7 getLikes(documentId)
export const getLikes = createAsyncThunk(
  "posts/getLikes",
  async (documentId, thunkAPI) => {
    try {
      const docRef = doc(db, "posts", documentId);
      const q = query(collection(docRef, "likes"));

      const querySnapshot = await getDocs(q);

      let result = [];
      querySnapshot.forEach((doc) => {
        const like = doc.data();
        result.push(like);
      });

      return result;
    } catch (error) {
      console.log("Error getting likes: ", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
