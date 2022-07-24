import React from 'react';
import {  useSelector } from "react-redux";
import DeleteComment from './DeleteComment';

const Comments = ({post}) => {
    
    const auth = useSelector((state) => state.auth.auth);
    const comments = post.Comments;

    

    return (
        <>
         
            {comments &&
        comments.map((comment) => ( <div key={comment.id} className='user' style={{
            padding: "25px",
            
          }} > <img  src={comment.User.profilePicture} alt="" /> <div style={{display: 'flex', gap : '5px'}} className='user-info'> <h5> {comment.User.name}</h5> :  
          <h5> {comment.content}</h5>  </div> {comment.userId === auth.userId || auth.isAdmin===true?(< DeleteComment post={post} comment={comment} />)  :null} </div>))}
        </>
    );
};

export default Comments;