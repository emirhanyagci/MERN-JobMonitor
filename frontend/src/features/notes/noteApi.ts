import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.BASE_URL,
  }),
  tagTypes: ["note"],
  endpoints: (builder) => (),
});
