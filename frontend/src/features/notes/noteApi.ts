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
      providesTags: ["notes"],
    }),
  }),
});

export const { useGetNotesQuery } = noteApi;
