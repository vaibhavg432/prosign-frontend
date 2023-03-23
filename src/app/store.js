import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/AuthApi";
import authReducer from "../features/Login";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
});
