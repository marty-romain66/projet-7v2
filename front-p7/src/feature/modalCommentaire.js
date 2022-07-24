import { createSlice } from "@reduxjs/toolkit"

export const modalCommantaireSlice = createSlice({
  name : "modalCommantaireChange" ,
    initialState : {
        modalCommantaireChange : false
    },
    reducers : {
        modalCommantaireChange : (state, {payload}) => {
            state.modalCommantaireChange = payload;

        }
       

        
    }
})


export const {modalCommantaireChange} = modalCommantaireSlice.actions;
export default modalCommantaireSlice.reducer;