import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants/data";

export const adminApi = createApi({
	reducerPath: "adminApi",
	baseQuery: fetchBaseQuery({
		baseUrl: apiUrl + "admin/",
		tagTypes: ["AdminApi"],
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
		getUsers: builder.query({
			query: () => "users",
			providesTags: (result) => (result ? ["AdminApi"] : ["AdminApi"]),
		}),
	}),
});

export const { useGetUsersQuery } = adminApi;
export default adminApi;
