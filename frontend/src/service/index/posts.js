import axios from "axios";
import { server } from "./server";

export const getAllPosts = async (searchKeyword = "", page = 1, limit = 10) => {
  try {
    const { headers, data } = await axios.get(
      `${server}/api/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    // 返回資料和其他相關資訊
    return { headers, data }; // 將 totalCount 作為一部分返回
  } catch (err) {
    if (err.response && err.response.data.message)
      throw new Error(err.response.data.message);
    throw new Error(err.message);
  }
};

export const getSinglePost = async ({ slug }) => {
  //從後端拿到資料
  try {
    const { data } = await axios.get(`${server}/api/posts/${slug}`);
    // console.log(data);
    return data;
  } catch (err) {
    if (err.response && err.response.data.message)
      throw new Error(err.response.data.message);
    //如果後端沒有給錯誤訊息，就給預設的錯誤訊息
    throw new Error(err.message);
  }
};

export const deletePost = async ({ slug, token }) => {
  //從後端拿到資料
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const { data } = await axios.delete(`${server}/api/posts/${slug}`, config);
    // console.log(data);
    return data;
  } catch (err) {
    if (err.response && err.response.data.message)
      throw new Error(err.response.data.message);
    //如果後端沒有給錯誤訊息，就給預設的錯誤訊息
    throw new Error(err.message);
  }
};

export const updatePost = async ({ updatedData, slug, token }) => {
  //從後端拿到資料
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${server}/api/posts/${slug}`,
      updatedData,
      config
    );
    return data;
  } catch (err) {
    if (err.response && err.response.data.message)
      throw new Error(err.response.data.message);
    //如果後端沒有給錯誤訊息，就給預設的錯誤訊息
    throw new Error(err.message);
  }
};

export const createPost = async ({token }) => {
  //從後端拿到資料
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/api/posts`,
      {},
      config
    );
    return data;
  } catch (err) {
    if (err.response && err.response.data.message)
      throw new Error(err.response.data.message);
    //如果後端沒有給錯誤訊息，就給預設的錯誤訊息
    throw new Error(err.message);
  }
};
