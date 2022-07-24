import { createSlice } from "@reduxjs/toolkit"

export const loginModalSlice = createSlice({
  name : "logModal" ,
    initialState : {
        logModal : null
    },
    reducers : { 
        logModalChange : (state, {payload}) => {
      state.logModal = payload;
    }
    }
        
        
       

        
    
})


export const { logModalChange} = loginModalSlice.actions;
export default loginModalSlice.reducer;