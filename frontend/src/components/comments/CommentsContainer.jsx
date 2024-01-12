import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCommentsData } from "../../data/comments";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewComment,
  deleteComment,
  updateComment,
} from "../../service/index/comment.js";
import { toast } from "react-hot-toast";

const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  postSlug,
}) => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  //改變需要改變的評論
  const [affectedComment, setAffectedComment] = useState(null);

  //主要評論和次要評論
  const mainComments = comments.filter((comment) => comment.parent === null);
  const replies = comments.filter((comment) => comment.parent !== null);

  //!新增評論
  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      token: userState.userInfo.token,
      desc: value,
      slug: postSlug,
      parent,
      replyOnUser,
    });
    setAffectedComment(null);
  };
  //update
  const { mutate: mutateUpdateComment, isLoading: isLoadingUpdateComment } =
    useMutation({
      mutationFn: ({ token, desc, commentId }) => {
        return updateComment({ token, desc, commentId });
      },
      onSuccess: (data) => {
        toast.success("Comment is updated");
        queryClient.invalidateQueries(["blog", postSlug]);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  //create
  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createNewComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: (data) => {
        toast.success("Comment is added");
        
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

    //delete
  const { mutate: mutateDeleteComment, isLoading: isLoadingDeleteComment } =
  useMutation({
    mutationFn: ({ token, commentId }) => {
      return deleteComment({ token, commentId });
    },
    onSuccess: (data) => {
      toast.success("Your comment is deleted.");
      //這句話要加才會在畫面刪除
      queryClient.invalidateQueries(["blog", postSlug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const updateCommentHandler = (value, commentId) => {
    mutateUpdateComment({
      token: userState.userInfo.token,
      desc: value,
      commentId,
    });
    setAffectedComment(null);
  };
  //創建完props後就要在這邊處理
  const deleteCommentHandler = (commentId) => {
    mutateDeleteComment({
      token: userState.userInfo.token,
      commentId,
    })
  };
  //這邊獲得有回覆的評論

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHanlder={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />

      <div className="space-y-4 mt-8">
        {mainComments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            // replies={getReplies(comment._id)}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
