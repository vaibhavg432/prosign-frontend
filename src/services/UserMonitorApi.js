import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants/data";

export const userMonitorApi = createApi({
	reducerPath: "userMonitorApi",
	tagTypes: ["UserMonitor"],
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
		playOneDocumentOnAllScreen: builder.mutation({
			query: (documentId) => ({
				url: "play-document-all-screens",
				method: "POST",
				body: { documentId },
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
	}),
});

export const {
	useGetUserMonitorQuery,
	useGetCurrentPlayingMonitorsQuery,
	useAddMonitorMutation,
	usePlayOneDocumentOnAllScreenMutation,
	useStopAllScreensMutation,
} = userMonitorApi;
export default userMonitorApi;
