import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userLoggedIn: false,
	adminLoggedIn: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLogin: (state, action) => {
			state.userLoggedIn = true;
			state.adminLoggedIn = false;
		},
		adminLogin: (state, action) => {
			state.userLoggedIn = false;
			state.adminLoggedIn = true;
		},
		logout: (state, action) => {
			state.userLoggedIn = false;
			state.adminLoggedIn = false;
		},
	},
});

export const { userLogin, adminLogin, logout } = authSlice.actions;
export default authSlice.reducer;
