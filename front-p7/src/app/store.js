import { configureStore } from "@reduxjs/toolkit";
import posts from "../feature/post.slice";
import modal from "../feature/modal.slice";
import auth from "../feature/auth.slice";
import  logModal from "../feature/loginModal.slice";
import admin from "../feature/admin.slice";

import  modalCommantaireChange  from "../feature/modalCommentaire";
export default configureStore({
    reducer: {
        posts: posts,
        modale : modal,
        auth : auth,
        logModal :  logModal,
        modalCommantaireChange : modalCommantaireChange,
        admin : admin,
        
    },
  
}
);
    

