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
		totalScreens: builder.query({
			query: () => "total-screens",
			providesTags: (result) => (result ? ["AdminApi"] : ["AdminApi"]),
		}),
		currentPlayingScreens: builder.query({
			query: () => "current-playing-screens",
			providesTags: (result) => (result ? ["AdminApi"] : ["AdminApi"]),
		}),
		toggleStatusOfUser: builder.mutation({
			query: (userId) => ({
				url: `toggle-status/${userId}`,
				method: "PATCH",
			}),
			invalidatesTags: ["AdminApi"],
		}),
		updateScreenLimit: builder.mutation({
			query : (body)	=> ({
				url: `update-screen-limit/${body.id}`,
				method: "PATCH",
				body
			}),
			invalidatesTags: ["AdminApi"],
		})
	}),
});

export const {
	useGetUsersQuery,
	useUpdateScreenLimitMutation,
	useTotalScreensQuery,
	useCurrentPlayingScreensQuery,
	useToggleStatusOfUserMutation,
} = adminApi;
export default adminApi;
