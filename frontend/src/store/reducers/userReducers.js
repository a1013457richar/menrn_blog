import { createSlice } from "@reduxjs/toolkit";
//這邊要傳給reducer的初始值
const initialState = {
  userInfo: null,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    //下面定義這個reducer要做的事情
    setUserInfo(state, action) {
      //這邊的action.payload是從action傳過來的值
      //就把這個值設定給state.userInfo
      state.userInfo = action.payload;
    },
    // logout: (state) => {
    //   state.userInformation = null;
    // },
    resetuserInfo(state,action) {
      state.userInfo = null;
    } 
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
