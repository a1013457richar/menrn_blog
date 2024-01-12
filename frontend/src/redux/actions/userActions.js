// actions/userActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index";

export const signIn = createAsyncThunk(
  "user/signin",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.signIn(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const signinGoogle = createAsyncThunk(
//   "user/signinGoogle",
//   async (accessToken, { rejectWithValue }) => {
//     try {
//       const { data } = await api.signInGoogle(accessToken);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const signup = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.signUp(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupGoogle = createAsyncThunk(
  "user/signupGoogle",
  async (accessToken, { rejectWithValue }) => {
    try {
      const { data } = await api.signUpGoogle(accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    const localUser = JSON.parse(localStorage.getItem("user_info"));
    if (localUser) {
      return localUser;
    } else {
      return rejectWithValue("No user found in local storage");
    }
  }
);
