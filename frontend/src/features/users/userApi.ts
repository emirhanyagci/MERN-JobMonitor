/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { User } from "./columns";
import { RootState } from "@/app/store";
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

      api.dispatch(setCredentials(refreshResult.data.accessToken));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      // edit providedTags for specific tagf for each note
      providesTags: (result) =>
        result
          ? result.map(({ _id }: { _id: string }) => ({
              type: "users",
              id: _id,
            }))
          : ["users"],
    }),
    addNewUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: "/users",
        method: "PATCH",
        body: updatedUser,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "users", id: arg.id },
      ],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "users", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
