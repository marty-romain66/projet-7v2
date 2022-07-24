import { createSlice } from "@reduxjs/toolkit"

export const postSlice = createSlice({
  name : "posts" ,
    initialState : {
        posts : null
    },
    reducers : {
        getPosts : (state, {payload}) => {
            state.posts = payload;

        },
        addPosts :(state, {payload}) => {
            state.posts.push(payload);
        },

        
    }
})


export const {getPosts, addPosts } = postSlice.actions;
export default postSlice.reducer;