import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducers"; // 確保這裡的路徑是正確的

// 如果 localStorage 有值，就把 localStorage 的值作為初始值
const userInfoFromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null;

const initialState = {
  user: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    user: userReducer, // 使用 userSlice 的 reducer
  },
  preloadedState: initialState, // 初始 state
});

export default store;
