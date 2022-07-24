import { createSlice } from "@reduxjs/toolkit"

export const modalSlice = createSlice({
  name : "modal" ,
    initialState : {
        modal : "none"
    },
    reducers : {
        modalChange : (state, {payload}) => {
            state.modal = payload;

        },
        modalClass : (state, {payload}) => {
            state.modalClass = payload;
        }
       

        
    }
})


export const {modalChange} = modalSlice.actions;
export default modalSlice.reducer;