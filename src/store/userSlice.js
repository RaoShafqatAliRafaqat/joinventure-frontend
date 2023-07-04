import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    customerEmail: '',
    customerName: '',
    auth: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { _id, customerName, customerEmail, auth } = action.payload;
            state._id = _id;
            state.customerName = customerName;
            state.customerEmail = customerEmail;
            state.auth = auth;

        },
        resetUser: (state) => {
            state._id = "";
                state.customerEmail = "";
                state.customerName = "";
                state.auth = false;
        },
    },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;