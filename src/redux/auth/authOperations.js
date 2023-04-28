import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { auth } from "../../firebase/config";

// * #1 authSignUp(name, email, password)
export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ name, email, password }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });

      {
        const { displayName, email, photoURL, uid } = auth.currentUser;
        return { displayName, email, photoURL, uid };
      }
    } catch (error) {
      console.log(error.message);
      showMessage({
        message: "Error Sign up",
        description: error.message,
        type: "danger",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// * #2 authLogIn( email, password)
export const authLogIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      {
        const { displayName, email, photoURL, uid } = user;
        return { displayName, email, photoURL, uid };
      }
    } catch (error) {
      console.log(error.message);
      showMessage({
        message: "Error log in",
        description: error.message,
        type: "danger",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// * #3 authLogOut
export const authLogOut = createAsyncThunk(
  "auth/logOut",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return;
    } catch (error) {
      console.log(error.message);
      showMessage({
        message: "Error log out",
        description: error.message,
        type: "danger",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
