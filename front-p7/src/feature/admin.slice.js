import { createSlice } from "@reduxjs/toolkit"


export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        admin: false,
    },
    reducers: {
       getUser: (state, { payload }) => {
            state.admin = payload;
        },
        deleteUser: (state, { payload }) => {
            state.admin = state.admin.filter(admin => admin.id !== payload);
        }
    }
}
)
export const {  getUser, deleteUser } = adminSlice.actions;
export default adminSlice.reducer;
