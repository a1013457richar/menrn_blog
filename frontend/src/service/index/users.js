import axios from "axios";
import { server } from "./server";
// 用來發送一個包含用戶註冊信息的 HTTP POST 請求
export const signup = async ({ name, email, password }) => {
  //從後端拿到資料
  try {
    const { data } = await axios.post(
      `${server}/api/users/register`,
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    if (err.response && err.response.data.message)
      throw new Error(err.response.data.message);
    //如果後端沒有給錯誤訊息，就給預設的錯誤訊息
    throw new Error(err.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(
      `${server}/api/users/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    if (err.response && err.response.data.message)
      throw new Error(err.response.data.message);
    throw new Error(err.message);
  }
};

//獲取用戶資料
export const getUserProfile = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${server}/api/users/profile`, config, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    if (err.response && err.response.data.message)
      throw new Error(err.response.data.message);
    throw new Error(err.message);
  }
};
//update user profile
export const updateProfile = async ({ token, userData }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${server}/api/users/updateProfile`,
      userData,
      config,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    if (err.response && err.response.data.message)
      throw new Error(err.response.data.message);
    throw new Error(err.message);
  }
};
//uodateprofile picture
export const updateProfilePicture = async ({ token, formData }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${server}/api/users/updateProfilePicture`,
      formData,
      config,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    if (err.response && err.response.data.message)
      throw new Error(err.response.data.message);
    throw new Error(err.message);
  }
};
