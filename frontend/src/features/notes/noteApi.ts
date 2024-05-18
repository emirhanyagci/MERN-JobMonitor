/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["notes"],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      // edit providedTags for specific tagf for each note
      providesTags: (result) =>
        result
          ? result.map(({ _id }: { _id: string }) => ({
              type: "notes",
              id: _id,
            }))
          : ["notes"],
    }),
    addNote: builder.mutation({
      query: (note) => ({
        url: "/notes",
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["notes"],
    }),
    updateNote: builder.mutation({
      // requireds
      query: (note) => ({
        url: "/notes",
        method: "PATCH",
        body: note,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "notes", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: "/notes",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "notes", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = noteApi;
