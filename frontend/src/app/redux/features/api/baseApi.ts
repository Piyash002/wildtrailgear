
import { fetchBaseQuery, type FetchArgs, type BaseQueryFn, type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { RootState } from "../../store/Store";
import { createApi } from "@reduxjs/toolkit/query/react";
import { logoutUser, setUser } from "../auth/AuthSlice/AuthSlice";
// Base Query
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
prepareHeaders: (headers, { getState }) => {
  const token = (getState() as RootState).auth.token;
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
}

});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      const newAccessToken = data?.data?.accessToken;
      if (newAccessToken) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(setUser({
          user:user, 
          token:newAccessToken
        }))
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logoutUser());
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      api.dispatch(logoutUser());
    }
  }
  return result;
};
export const baseApi = createApi({
  reducerPath: "BaseApi",
  baseQuery: baseQueryWithReauth,
   tagTypes: ['Users', 'Categories', 'Products'],
  endpoints: () => ({}),
});
