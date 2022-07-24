import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
  },
  reducers: {
    getPosts: (state, { payload }) => {
      state.posts = payload;
    },
    addPosts: (state, { payload }) => {
      state.posts.push(payload);
      
    },
    deletePosts: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
    updatePosts: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload.id) {
          console.log(payload);
          return payload;
        } else {
          return post;
        }
      });
    },
    addComment: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload[0]) {
          console.log(payload);
          return {
            ...post,
            Comments: payload[1],
          };
        } else {
          return post;
        }
      });
    },
   addLike: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload[0]) {
          console.log(payload);
          return {
            ...post,
            Likes: payload[1],
          };
        } else {
          return post;
        }
      });
    },
    updateComment: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload[0]) {
          return {
            ...post,
            Comments: payload[1],
          };
        } else {
          return post;
        }
      });
    },
    deleteComment: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload[0]) {
          return {
            ...post,
            Comments: post.Comments.filter(
              (comment) => comment.id !== payload[1]
            ),
          };
        } else {
          return post;
        }
      });
    },
  },
});
export const {
  addLike,
  getPosts,
  addPosts,
  deletePosts,
  updatePosts,
  addComment,
  updateComment,
  deleteComment,
} = postSlice.actions;
export default postSlice.reducer;
