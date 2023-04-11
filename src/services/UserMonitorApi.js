import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants/data";

export const userMonitorApi = createApi({
	reducerPath: "userMonitorApi",
	tagTypes: ["UserMonitor"],
	baseQuery: fetchBaseQuery({
		baseUrl: apiUrl + "screen-group/",
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
		getUserMonitor: builder.query({
			query: () => "screens",
			providesTags: (result) =>
				result ? ["UserMonitor"] : ["UserMonitor"],
		}),
		getCurrentPlayingMonitors: builder.query({
			query: () => "playing-screens",
			providesTags: (result) =>
				result ? ["UserMonitor"] : ["UserMonitor"],
		}),
		addMonitor: builder.mutation({
			query: (count) => ({
				url: "add-multiple-screens",
				method: "POST",
				body: { count },
			}),
			invalidatesTags: ["UserMonitor"],
		}),
		updateMonitorName: builder.mutation({
			query: (body) => ({
				url: `update-screen-name/${body.id}`,
				method: "PATCH",
				body: { name: body.name },
			}),
			invalidatesTags: ["UserMonitor"],
		}),
		playOneDocumentOnAllScreen: builder.mutation({
			query: (documentId) => ({
				url: "play-document-all-screens",
				method: "POST",
				body: { documentId },
			}),
			invalidatesTags: ["UserMonitor"],
		}),
		playPlaylistOnMixedScreens: builder.mutation({
			query: (body) => ({
				url: "play-playlist-mixed-screens",
				method: "POST",
				body: body,
			}),
			invalidatesTags: ["UserMonitor"],
		}),
		stopAllScreens: builder.mutation({
			query: () => ({
				url: "stop-document-all-screens",
				method: "POST",
			}),
			invalidatesTags: ["UserMonitor"],
		}),
		stopPlayListOneScreen: builder.mutation({
			query: (id) => ({
				url: `stop-playlist-one-screen/${id}`,
				method: "POST",
			}),
			invalidatesTags: ["UserMonitor"],
		}),
		stopPlayListOneGroup: builder.mutation({
			query: (id) => ({
				url: `stop-playlist-one-group/${id}`,
				method: "POST",
			}),
			invalidatesTags: ["UserMonitor"],
		}),

		//Group APIS
		getGroupedScreens: builder.query({
			query: () => "screen-groups",
			providesTags: (result) =>
				result ? ["UserMonitor"] : ["UserMonitor"],
		}),
		getUngroupedScreens: builder.query({
			query: () => "ungrouped-screens",
			providesTags: (result) =>
				result ? ["UserMonitor"] : ["UserMonitor"],
		}),
		createAScreenGroup: builder.mutation({
			query: (body) => ({
				url: "create-screen-group",
				method: "POST",
				body: body,
			}),
			invalidatesTags: ["UserMonitor"],
		}),
		deleteAScreenGroup: builder.mutation({
			query: (id) => ({
				url: `delete-screen-group/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["UserMonitor"],
		}),
		logoutScreen: builder.mutation({
			query: (id) => ({
				url: `logout-screen/${id}`,
				method: "POST",
			}),
			invalidatesTags: ["UserMonitor"],
		}),
	}),
});

export const {
	useGetUserMonitorQuery,
	useGetCurrentPlayingMonitorsQuery,
	useAddMonitorMutation,
	useUpdateMonitorNameMutation,
	usePlayOneDocumentOnAllScreenMutation,
	useStopAllScreensMutation,
	usePlayPlaylistOnMixedScreensMutation,
	useStopPlayListOneScreenMutation,
	useStopPlayListOneGroupMutation,
	useLogoutScreenMutation,

	useGetGroupedScreensQuery,
	useGetUngroupedScreensQuery,
	useCreateAScreenGroupMutation,
	useDeleteAScreenGroupMutation,
} = userMonitorApi;
export default userMonitorApi;
