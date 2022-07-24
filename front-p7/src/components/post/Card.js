import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddCommentIcon from "@mui/icons-material/AddComment";
import axios from "axios";
import AddComm from "../comment/AddComm";
import Comments from "../comment/Comments";
import { deletePosts, addLike } from "../../feature/post.slice";
import EditIcon from "@mui/icons-material/Edit";
import ModifyPost from "./ModifyPost";
import { pink } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const Card = ({ post }) => {
  const [modal, setModal] = React.useState(false);
  const [modalImage, setModalImage] = React.useState(false);
  const [modalComment, setModalComment] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [modalLike, setModalLike] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);

  let adminUrl = "";
  if (auth.isAdmin === true || auth.admin === true) {
    adminUrl = "admin/";
  }

  const deleteCard = (e) => {
    e.preventDefault();
    setModalDelete(!modalDelete);
  };
  const deletePost = (e) => {
    e.preventDefault();

    if (
      auth.userId === post.userId ||
      auth.isAdmin === true ||
      auth.admin === true
    ) {
      axios
        .delete(`http://localhost:3001/api/posts/${adminUrl}${post.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          data: {
            userId: auth.userId,
          },
          params: {
            id: post.id,
          },
        })
        .then((res) => {
          dispatch(deletePosts(post.id));
        });
    }
  };

  const modalCommantaire = (e) => {
    if (modalComment === false) {
      setModalComment(true);
    } else {
      setModalComment(false);
    }
  };
  const image = () => {
    if (post.imageUrl) {
      return (
        <img
          style={{
            height: modalImage ? "100%" : "400px",
            cursor: "pointer",
          }}
          onClick={modalImages}
          src={post.imageUrl}
          alt="post"
        />
      );
    } else {
      return null;
    }
  };
  const modalImages = (e) => {
    e.preventDefault();
    if (modalImage === false) {
      setModalImage(true);

      console.log("modalImage", modalImage);
    } else {
      setModalImage(false);
    }
    console.log("modalImage", modalImage);
  };

  axios({
    method: "get",
    url: `http://localhost:3001/api/posts/${post.id}/comments/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`,
    },
  }).catch((err) => {
    console.log(err);
  });

  const postLike = (e) => {
    e.preventDefault();
    const data = [
      ...post.Likes,
      { userId: auth.userId, like: true, userName: auth.name },
    ];

    axios
      .post(`http://localhost:3001/api/posts/${post.id}/likes`, {
        userId: auth.userId,
        like: true,
        postId: post.id,
        userName: auth.name,
      })
      .then((res) => {
        dispatch(addLike([post.id, data]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const found = () => {
    if (post.Likes?.length > 0) {
      return post.Likes.find((like) => like.userId === auth.userId);
    } else {
      return false;
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deleteLikes = () => {
    axios
      .delete(
        `http://localhost:3001/api/posts/${post.id}/likes/${auth.userId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          data: {
            userId: auth.userId,
          },
          params: {
            id: post.id,
          },
        }
      )
      .then((res) => {
        dispatch(
          addLike([
            post.id,
            post.Likes.filter((like) => like.userId !== auth.userId),
          ])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cards postion-relative">
      {modalDelete === true ? (
        <div style={{ zIndex: "20" }}>
          <h3>Etes vous sur de vouloir supprimer ce post?</h3>
          <span
            style={{ cursor: "pointer", color: "red", paddingRight: "10px" }}
            onClick={deletePost}
          >
            Oui
          </span>
          <span
            style={{ cursor: "pointer", color: "green" }}
            onClick={() => setModalDelete(!modalDelete)}
          >
            Non
          </span>
        </div>
      ) : null}
      {auth.userId === post.userId || auth.isAdmin === true ? (
        <div className="card__action ">
          <CloseIcon onClick={deleteCard} className="close" />
          <EditIcon
            onClick={() => setModal(!modal)}
            style={{ cursor: "pointer", color: "red" }}
          />
        </div>
      ) : null}

      {modal ? <ModifyPost post={post} modal={modal} /> : null}
      <div className="card-header">
        {post.imageStore ? (
          <div>
            <img
              style={{ cursor: "pointer" }}
              onClick={modalImages}
              src={post.imageStore}
              alt=""
            />{" "}
          </div>
        ) : (
          image()
        )}
      </div>
      <div className="card-body" style={{ display: modalImage.display }}>
        <div className="user">
          {post.User.profilePicture ? (
            <img src={post.User.profilePicture} alt="user" />
          ) : null}

          <div className="user-info">
            <h5> posté par : {post.User.name} </h5>
          </div>
        </div>
        <h4>{post.title}</h4>
        <p>{post.content}</p>

        <div>
          {post.Likes ? (
            <p onClick={handleClick} style={{ margin: "0", cursor: "pointer" }}>
              {" "}
              Aimé par {post.Likes.length}{" "}
              {post.Likes.length === 1 || post.Likes.length === 0 ?  <span>personne</span> : "personnes"}{" "}
            </p>
          ) : null}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>
              {" "}
              <p>Aimé par :</p>{" "}
              {post.Likes?.map((likes) => (
                <p key={likes.id}> {likes.userName}</p>
              ))}{" "}
            </Typography>
          </Popover>
          {modalLike ? (
            <div className="like">
              {" "}
              {post.Likes.map((likes) => (
                <span>ok</span>
              ))}{" "}
            </div>
          ) : null}
          {found() ? (
            <FavoriteIcon
              sx={{ color: pink[500] }}
              style={{ cursor: "pointer" }}
              onClick={deleteLikes}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ color: pink[500] }}
              onClick={postLike}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
        <div
          className="btnCommantaire"
          style={{ cursor: "pointer", display: "flex", margin: "0" }}
          onClick={modalCommantaire}
        >
          <AddCommentIcon></AddCommentIcon>
          Ajouter un commantaire
        </div>

        {modalComment ? <AddComm post={post} modal={modalComment} /> : null}
      </div>
      <Comments post={post} />
    </div>
  );
};

export default Card;
