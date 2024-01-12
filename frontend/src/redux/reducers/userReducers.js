import { createSlice } from "@reduxjs/toolkit";
import {
  signIn,
  // signinGoogle,
  signup,
  signupGoogle,
  loadUser,
} from "../actions/userActions";

const initialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      // 更新 state.userInfo 為 action.payload
      state.userInfo = action.payload;
    },
    resetUserInfo(state) {
      state.userInfo = null;
      localStorage.removeItem("account");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem("account", JSON.stringify(action.payload));
      })
      // .addCase(signinGoogle.fulfilled, (state, action) => {
      //   state.userInfo = action.payload;
      //   localStorage.setItem("account", JSON.stringify(action.payload));
      // })
      .addCase(signup.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem("account", JSON.stringify(action.payload));
      })
      .addCase(signupGoogle.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem("account", JSON.stringify(action.payload));
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
    // 请根据需要添加更多的 cases
  },
});

export const logout = () => (dispatch) => {
  dispatch(resetUserInfo()); // 使用 userSlice 中的 resetUserInfo action
  localStorage.removeItem("account");
};


export { userSlice };


export const { setUserInfo,resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
