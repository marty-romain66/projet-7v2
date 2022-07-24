import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name : "auth" ,
    initialState : {
        auth : false
    },
    reducers : { 
       auths : (state, {payload}) => {
      state.auth = payload;
    },
    modifyUser : (state, {payload}) => {
      console.log(payload);
      console.log("okkkkkkkkkkkkkkkkkkk");
      state.auth = payload;
    }

        
        
       

        
    }
})


export const {auths, modifyUser} = authSlice.actions;
export default authSlice.reducer;