import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";

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
// ! ////////////////////////////////////////////////////////
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
// ! /////////////////////////////////////////////////////////////
//  * POST @ /users/login
//  * body: { email, password }
//  */
// export const logIn = createAsyncThunk(
//   'auth/login',
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post('/users/login', credentials);
//       // After successful login, add the token to the HTTP header
//       setAuthHeader(res.data.token);
//       return res.data;
//     } catch (e) {
//       toast.error(
//         `Invalid login credentials. Please check your username and password and try again.`
//       );
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const authLogOut = createAsyncThunk(
//   "auth/logOut",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const { user } = await signInWithEmailAndPassword(auth, email, password);
//       {
//         const { displayName, email, photoURL, uid } = auth.currentUser;
//         return { displayName, email, photoURL, uid };
//       }
//     } catch (error) {
//       console.log(error.message);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
