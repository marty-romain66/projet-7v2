import axios from "axios";
import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../feature/admin.slice";
import { modifyUser } from "../feature/auth.slice";
import { auths } from "../feature/auth.slice";
import { IconButton} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const CardProfil = () => {
  const Input = styled("input")({
    display: "none",
  });
  const [imageBack, setImageBack] = useState("");
  const [image, setImage] = useState("");
  const [userDelete, setUserDelete] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const admin = useSelector((state) => state.admin);

  const deleteCompte = (userDelete) => {
    if (auth.auth.isAdmin === true) {
      return alert("Vous n'avez pas le droit de supprimer un compte admin");
    }
    axios
      .delete("http://localhost:3001/api/auth/user/" + userDelete, {})
      .then((res) => {
        console.log(res);
        dispatch(auths(false));
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(auths(false));
  };

  const updateUserByAdmin = (user) => {
    axios({
      method: "put",
      url: "http://localhost:3001/api/auth/admin/users/" + user.id,
      data: {
        isAdmin: true,
        userId: `${auth.auth.userId}`,
      },
      headers: {
        authorization: `bearer ${auth.auth.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        alert(`Utilisateur :${user.name} promu administrateur`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImage = (e) => {
    setImageBack(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const updateUser = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:3001/api/auth/user/${auth.auth.userId}`,
      data: {
        image: imageBack,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth.auth.token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        const user = {
          ...auth.auth,
          profilePicture: image,
        };
        dispatch(modifyUser(user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const chooseImage = () => {
    if (image) return image;
    else return auth.auth.profilePicture;
  };
  if (userDelete !== "") {
    deleteCompte(userDelete);
  }

  const deleteUserByAdmin = (user) => {
    if (auth.auth.isAdmin === true) {
      alert("Vous etes sur le point de supprimer un compte utilisateur");
      axios({
        method: "delete",
        url: `http://localhost:3001/api/auth/admin/users/${user.id}`,
        headers: {
          authorization: `bearer ${auth.auth.token}`,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      dispatch(deleteUser(user.id));
    }
  };
  return (
    <>
      <div className="cardProfile">
        <div
          className="User"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Bienvenue {auth.auth.name}</h1>
          {auth.auth.profilePicture !== null ? (
            <img className="imageProfile" src={chooseImage()} alt="" />
          ) : null}
        </div>
        <div>
          {auth.auth.profilePicture === null ? (
            <p>Ajouter une photo de profil : </p>
          ) : (
            <p>Modifier sa photo de profil</p>
          )}
          <label htmlFor="icon-button-file">
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
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button onClick={updateUser} variant="contained" component="span">
              Télécharger
            </Button>
          </label>
          <p
            onClick={() => setUserDelete(auth.auth.userId)}
            style={{ cursor: "pointer" }}
          >
            Supprimer mon Compte
          </p>
        </div>
        <div></div>
      </div>
      {auth.auth.isAdmin === true ? (
        <div className="cardProfile">
          <div
            className="User"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
          <h1>Vous êtes administrateur</h1>
          <div>
            <p>Liste des utilisateurs :</p>
            <ul>
              {admin.admin.map((user) => (
                <li key={user.id}>
                  {user.name}
                  <Button onClick={() => updateUserByAdmin(user)}>
                    Promouvoir administrateur
                  </Button>
                  <Button onClick={() => deleteUserByAdmin(user)}>
                    Supprimer
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CardProfil;
