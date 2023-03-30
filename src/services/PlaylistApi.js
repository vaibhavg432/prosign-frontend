import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants/data";

export const playlistApi = createApi({
	reducerPath: "playlistApi",
	tagTypes: ["Playlist"],
	baseQuery: fetchBaseQuery({
		baseUrl: apiUrl,
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem("token");
			if (token) {
				headers.set("auth-token", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getPlaylists: builder.query({
			query: () => "playlist",
			providesTags: (result) => (result ? ["Playlist"] : ["Playlist"]),
		}),
		getPlaylist: builder.query({
			query: (id) => `playlist/${id}`,
			providesTags: (result) => (result ? ["Playlist"] : ["Playlist"]),
		}),
		createPlaylist: builder.mutation({
			query: (body) => ({
				url: "playlist",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Playlist"],
		}),
		updatePlaylist: builder.mutation({
			query: (body) => ({
				url: `playlist/${body.id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Playlist"],
		}),
		deletePlaylist: builder.mutation({
			query: (id) => ({
				url: `playlist/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Playlist"],
		}),
	}),
});

export const {
	useGetPlaylistsQuery,
	useGetPlaylistQuery,
	useCreatePlaylistMutation,
	useUpdatePlaylistMutation,
	useDeletePlaylistMutation,
} = playlistApi;

export default playlistApi;
