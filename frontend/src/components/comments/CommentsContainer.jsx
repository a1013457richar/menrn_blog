import React, { useState } from "react";
import { useEffect } from "react";
// import { useSelector } from "react-redux";
import { getCommentsData } from "../../data/comments";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   createNewComment,
//   deleteComment,
//   updateComment,
// } from "../../services/index/comments";
// import { toast } from "react-hot-toast";

const CommentsContainer = ({
  className,
  logginedUserId,
  // comments,
  // postSlug,
}) => {
  // const queryClient = useQueryClient();
  // const userState = useSelector((state) => state.user);
  //改變需要改變的評論
  const [affectedComment, setAffectedComment] = useState(null);
  const [comments, setComments] = useState([]);
  //主要評論和次要評論
  const mainComments = comments.filter((comment) => comment.parent === null);
  const replies = comments.filter((comment) => comment.parent !== null);
  useEffect(() => {
    // console.log("here2");
    (async () => {
      // const CommentsData = () => {};
      const commentData = await getCommentsData();

      setComments(commentData);
    })();
  }, []);

  // const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
  //   useMutation({
  //     mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
  //       return createNewComment({ token, desc, slug, parent, replyOnUser });
  //     },
  //     onSuccess: () => {
  //       toast.success(
  //         "Your comment is sent successfully, it will be visible after the confirmation of the Admin"
  //       );
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //       console.log(error);
  //     },
  //   });

  // const { mutate: mutateUpdateComment } = useMutation({
  //   mutationFn: ({ token, desc, commentId }) => {
  //     return updateComment({ token, desc, commentId });
  //   },
  //   onSuccess: () => {
  //     toast.success("Your comment is updated successfully");
  //     queryClient.invalidateQueries(["blog", postSlug]);
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //     console.log(error);
  //   },
  // });

  // const { mutate: mutateDeleteComment } = useMutation({
  //   mutationFn: ({ token, desc, commentId }) => {
  //     return deleteComment({ token, commentId });
  //   },
  //   onSuccess: () => {
  //     toast.success("Your comment is deleted successfully");
  //     queryClient.invalidateQueries(["blog", postSlug]);
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //     console.log(error);
  //   },
  // });
  //!新增評論
  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: Math.random().toString(),
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: "it was a nice post, Thank you!",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: new Date().toISOString(),
    };
    //把新舊評論複製之後加入新評論
    setComments((curState) => {
      return [newComment, ...curState];
    });
    // mutateNewComment({
    //   desc: value,
    //   parent,
    //   replyOnUser,
    //   // token: userState.userInfo.token,
    //   // slug: postSlug,
    // });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    // mutateUpdateComment({
    //   token: userState.userInfo.token,
    //   desc: value,
    //   commentId,
    // });
    const updatedComment = comments.map((comment) => {
      if (comment._id === commentId) {
        //overwrite the desc
        return { ...comment, desc: value };
      }
      //之後在return comment
      return comment;
    });
    setComments(updatedComment);
    //form 才會不見
    setAffectedComment(null);
  };
  //創建完props後就要在這邊處理
  const deleteCommentHandler = (commentId) => {
    const commentsAfterDelete = comments.filter(
      (comment) => comment._id !== commentId
    );
    setComments(commentsAfterDelete);
    // mutateDeleteComment({ token: userState.userInfo.token, commentId });
  };
  //這邊獲得有回覆的評論
  const getReplies = (commentId) => {
    return replies
      .filter((reply) => reply.parent === commentId)
      .sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() ;
      });
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHanlder={(value) => addCommentHandler(value)}
        // loading={isLoadingNewComment}
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
            replies={getReplies(comment._id)}
            // replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
