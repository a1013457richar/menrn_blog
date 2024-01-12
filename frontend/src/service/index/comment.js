import axios from "axios";
import { server } from "./server";
export const createNewComment = async ({
  token,
  desc,
  post,
  parent,
  replyOnUser,
  slug
//   slug
}) => {
  //從後端拿到資料
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${server}/api/comments`,
      {
        desc,
        post,
        parent,
        replyOnUser,
        slug
      },
      config,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    if (err.response && err.response.data.message)
      throw new Error(err.response.data.message);
    //如果後端沒有給錯誤訊息，就給預設的錯誤訊息
    throw new Error(err.message);
  }
};

export const updateComment = async ({
    token,
    desc,
    commentId
  //   slug
  }) => {
    //從後端拿到資料
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${server}/api/comments/${commentId}`,
        {
          desc,
        },
        config,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (err) {
      if (err.response && err.response.data.message)
        throw new Error(err.response.data.message);
      //如果後端沒有給錯誤訊息，就給預設的錯誤訊息
      throw new Error(err.message);
    }
  };

  export const deleteComment = async ({
    token,
    commentId
  //   slug
  }) => {
    //從後端拿到資料
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${server}/api/comments/${commentId}`,
        config,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (err) {
      if (err.response && err.response.data.message)
        throw new Error(err.response.data.message);
      //如果後端沒有給錯誤訊息，就給預設的錯誤訊息
      throw new Error(err.message);
    }
  };


