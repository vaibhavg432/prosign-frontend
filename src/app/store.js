import { configureStore } from "@reduxjs/toolkit";
import { authApi, userMediaApi, userMonitorApi, userApi } from "../services";
import authReducer from "../features/Login";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[userMediaApi.reducerPath]: userMediaApi.reducer,
		[userMonitorApi.reducerPath]: userMonitorApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			userMediaApi.middleware,
			userMonitorApi.middleware,
			userApi.middleware
		),
});
