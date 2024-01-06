import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";
//如果localstorage有值，就把localstorage的值作为初始值，如果没有就是空对象
const userInfoFromStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null;

const initialState = {
  user: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    //reducer
    user: userReducer,
  },
  //preloadedState
  preloadedState: initialState
});

export default store;
