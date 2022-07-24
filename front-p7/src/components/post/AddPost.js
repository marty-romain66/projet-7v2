import axios from "axios";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addPosts } from "../../feature/post.slice";
import { getPosts } from "../../feature/post.slice";
import { useDispatch, useSelector } from "react-redux";
import { modalChange } from "../../feature/modal.slice";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
const AddPost = () => {
  const Input = styled("input")({
    display: "none",
  });
  const modal = useSelector((state) => state.modale.modal);
  const auth = useSelector((state) => state.auth.auth);

  const [title, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [image, setImage] = useState("");
  const [imageBack, setImageBack] = useState("");

  const dispatch = useDispatch();
  const handleTitre = (e) => {
    setTitre(e.target.value);
  };

  const handleContenu = (e) => {
    setContenu(e.target.value);
  };
  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setImageBack(e.target.files[0]);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if(title===""){
      return alert("Veuillez remplir au moins le titre")
    } else {

    console.log(image);
    const datas = {
      title,
      content: contenu,
      userId: auth.userId,
      name: auth.name,
      image: imageBack,
      imageStore: image,
      id: "",
      User: {
        name: auth.name,
      },
    };

    try {
      axios({
        method: "post",
        formData: true,
        url: "http://localhost:3001/api/posts",
        data: datas,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((res) => {
     const dataId = {
      title,
      content: contenu,
      userId: auth.userId,
      name: auth.name,
      image: imageBack,
      imageStore: image,
      id: res.data.id,
      User: {
        name: auth.name,
        profilePicture : auth.profilePicture
      },
      Likes: [],
      Comments: [],
    };
        dispatch(addPosts(dataId));
      })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setContenu("");
          setTitre("");
          setImage("");
          setImageBack("");
        }
        );
    } catch (error) {
      console.log(error);
    }
  }
  }




  const deletePreview = (e) => {
    e.preventDefault();
    setImage("");
    setImageBack("");
  };
  return (
    <div className={`addPost ${modal}`}>
      <form
        id="reset"
        enctype="multipart/form-data"
        action="/upload_files"
        method="post"
        onSubmit={handlePost}
      >
        <CloseIcon
          className="close"
          onClick={() => dispatch(modalChange("none"))}
        />
        <span>Titre du post </span>
        <input onChange={handleTitre} type="text" value={title} />
        <span>Contenu du post </span>
        <label htmlFor="icon-button-file">
          {image ? (
            <div style={{position :"relative"}} >
              <img
                style={{ height: "300px", width: "300px", objectFit: "cover" }}
                src={image}
                alt="image"
              />
              <CloseIcon style={{position : "absolute" , top : "0px", right : "10px"}} className="close" onClick={deletePreview} />{" "}
            </div>
          ) : null}
          <Input
            onChange={handleImage}
            accept="image/*"
            id="icon-button-file"
            type="file"
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={handleContenu}
          value={contenu}
        ></textarea>
        <button onClick={() => dispatch(modalChange("none"))} type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default AddPost;
