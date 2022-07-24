import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePosts } from "../../feature/post.slice";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const ModifyPost = ({ post, modal }) => {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [modals, setModals] = React.useState(modal);
  const auth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState("");
  const [imageBack, setImageBack] = useState("");
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
useEffect(() => {
  if(modal===true){
    handleOpen();

  }
}, [modal])
  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setImageBack(e.target.files[0]);
  };

  const update = (e) => {
    e.preventDefault();
    setModals(false);
    axios({
      method: "put",
      url: `http://localhost:3001/api/posts/${post.id}`,
      data: {
        title,
        content,
        userId: auth.userId,
        image: imageBack,
        imageStore: image,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
       

        axios({
          method: "get",
          url: "http://localhost:3001/api/posts/" + post.id,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token}`,
          },
        }).then((res) => {
          console.log(res.data);
          dispatch(updatePosts(res.data));
          handleClose();
          
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
<div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form>
          <Typography variant="h6" gutterBottom>
            Titre du post
          </Typography>
          <input
            type="text"
            value={title}
    
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography variant="h6" gutterBottom>
            Contenu du post
          </Typography>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input onChange={handleImage} type="file" name="file" />
          <Button onClick={ update } variant="contained" component="span">
              Télécharger
            </Button>
        </form>
        </Box>
      </Modal>
    </div>




    // <div>
    //   {modals ? (
        // <form>
        //   <input
        //     type="text"
        //     placeholder={post.title}
        //     onChange={(e) => setTitle(e.target.value)}
        //   />
        //   <input
        //     type="text"
        //     placeholder={post.content}
        //     onChange={(e) => setContent(e.target.value)}
        //   />
        //   <input onChange={handleImage} type="file" name="file" />
        //   <button onClick={update}>modifié le post</button>
        // </form>
    //   ) : null}
    // </div>
  );
};

export default ModifyPost;
