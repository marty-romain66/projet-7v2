import React from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../feature/post.slice";
const DeleteComment = ({ comment, post }) => {
  const auth = useSelector((state) => state.auth.auth);
  let adminUrl = "";
  if (auth.isAdmin === true || auth.admin === true) {
    adminUrl = "admin/";
  }
  const dispatch = useDispatch();

  const deleteComments = (e) => {
    e.preventDefault();
    axios

      .delete(
        `http://localhost:3001/api/posts/${adminUrl}${post.id}/comments/${comment.id}/`,
        {
          data: {
            userId: comment.userId,
          },
        }
      )
      .then((res) => {
        console.log(comment.id);
        dispatch(deleteComment([post.id, comment.id]));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (

    < CloseIcon onClick={deleteComments} style={{ cursor: "pointer", color: "red" }} />

  );
};

export default DeleteComment;
