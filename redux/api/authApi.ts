import { baseQueryWithLogout } from './baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export interface LoginResponse {
  message: string;
  token_type: string;
  token: string;
  role: 'super-admin' | 'sub-admin';
  dashboard: string;
  admin: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    role: string;
    status: string;
    last_seen_at: string;
    created_at: string;
    updated_at: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMe: builder.query({
      query: () => '/me',
    }),
  }),
})

export const { useLoginMutation, useGetMeQuery } = authApi
