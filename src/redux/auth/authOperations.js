import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ? I lond time have been trying to do this operation )))
// export const authStateChangeUser = () => {
//   try {
//     let isAuth = false;
//     let userId;
//     let name;
//     let email;
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // userId = user.uid;
//         // name = user.displayName;
//         // email = user.email;
//         isAuth = true;
//       }
//     });

//     // return { isAuth, email, name, userId };
//     return isAuth;
//   } catch (error) {
//     console.log(error.message);
//     return thunkAPI.rejectWithValue(error.message);
//   }
// };
