import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  doc,
  query,
  where,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../../firebase/config";

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

      querySnapshot.forEach(async (docum) => {
        const post = docum.data();
        post.documentId = docum.id;

        // const docRef = doc(db, "posts", docum.id);
        // const coll = collection(docRef, "comments");
        // const snapshot = await getCountFromServer(coll);
        // console.log("commentsCount: ", snapshot.data().count);
        // post.commentCounter = snapshot.data().count;
        // console.log("one post ==>", post);
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
      console.log("Error adding comment: ", error.message);
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

// * #5 getNumberComents(documentId)
// export const getNumberComents = createAsyncThunk(
//   "posts/getNumberComents",
//   async (documentId, thunkAPI) => {
//     try {
//       const docRef = doc(db, "posts", documentId);
//       const coll = collection(docRef, "comments");
//       const snapshot = await getCountFromServer(coll);
//       console.log("count: ", snapshot.data().count);

//       return snapshot.data().count;
//     } catch (error) {
//       console.log("Error count comments: ", error.message);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const q = async () => {
//   const coll = collection(db, "posts");
//   const snapshot = await getCountFromServer(coll);
//   console.log("count: ", snapshot.data().count);
// };
