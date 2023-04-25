import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants/data";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: apiUrl + "auth/",
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem("token");
			if (token) {
				headers.set("auth-token", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	typeTags: ["auth"],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "login",
				method: "POST",
				body: credentials,
			}),
		}),
		register: builder.mutation({
			query: (credentials) => ({
				url: "register",
				method: "POST",
				body: credentials,
			}),
		}),
		resetPassword: builder.mutation({
			query: (credentials) => ({
				url: "reset-password",
				method: "POST",
				body: credentials,
			}),
		}),
		forgetPassword: builder.mutation({
			query: (credentials) => ({
				url: "forgot-password",
				method: "POST",
				body: credentials,
			}),
		}),
		changePassword: builder.mutation({
			query: (credentials) => ({
				url: "change-password",
				method: "POST",
				body: credentials,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useResetPasswordMutation,
	useForgetPasswordMutation,
	useChangePasswordMutation,
} = authApi;
export default authApi;
