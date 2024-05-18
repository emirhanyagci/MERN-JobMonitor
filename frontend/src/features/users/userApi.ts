/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      // edit providedTags for specific tagf for each note
      providesTags: ["users"],
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
