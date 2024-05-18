import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.BASE_URL,
  }),
  tagTypes: ["user"],
  endpoints: () => ({}),
});
