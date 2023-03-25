import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants/data";

export const userApi = createApi({
	reducerPath: "userApi",
	tagTypes: ["User", "UserMonitor"],
	baseQuery: fetchBaseQuery({
		baseUrl: apiUrl + "user/",
		prepareHeaders: (headers, { getState }) => {
			//get token from localStorage
			const token = localStorage.getItem("token");
			if (token) {
				headers.set("auth-token", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => "user",
			providesTags: (result) =>
				result ? ["User", "UserMonitor"] : ["User", "UserMonitor"],
		}),
	}),
});

export const { useGetUserQuery } = userApi;
export default userApi;
