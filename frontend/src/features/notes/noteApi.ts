/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/app/store";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../auth/authSlice";
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    // try to get a new token
    const refreshResult: any = await baseQuery(
      "/auth/refresh",
      api,
      extraOptions
    );
    if (refreshResult.data) {
      // store the new token
      console.log(refreshResult);

      api.dispatch(setCredentials(refreshResult.data.accessToken));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};
export const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: baseQueryWithReauth,
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
