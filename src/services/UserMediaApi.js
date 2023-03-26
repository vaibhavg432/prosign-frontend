import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants/data";

export const userMediaApi = createApi({
	reducerPath: "userMediaApi",
	baseQuery: fetchBaseQuery({
		baseUrl: apiUrl + "user/",
		tagTypes: ["UserMedia"],
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
		getAllDocuments: builder.query({
			query: () => "documents",
			providesTags: (result) => (result ? ["UserMedia"] : ["UserMedia"]),
		}),
		getOneDocument: builder.query({
			query: (documentId) => ({
				url: `document/${documentId}`,
				method: "GET",
			}),
			providesTags: (result) => (result ? ["UserMedia"] : ["UserMedia"]),
		}),
		deleteOneDocument: builder.mutation({
			query: (documentId) => ({
				url: "delete-document",
				method: "DELETE",
				body: { documentId },
			}),
			invalidatesTags: ["UserMedia"],
		}),
		updateOneDocument: builder.mutation({
			query: (body) => ({
				url: "update-document",
				method: "PATCH",
				body: body,
			}),
			invalidatesTags: ["UserMedia"],
		}),
	}),
});

export const {
	useGetAllDocumentsQuery,
	useGetOneDocumentQuery,
	useDeleteOneDocumentMutation,
	useUpdateOneDocumentMutation,
} = userMediaApi;
export default userMediaApi;
