import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const membershipApi = createApi({
  reducerPath: 'membershipApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerMember: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),
    getAllLgas: builder.query({
      query: () => '/lgas',
    }),
    getAllWards: builder.query({
      query: (lgaId) => `/wards/${lgaId}`,
    }),
    getAllPollingUnits: builder.query({
      query: (wardId) => `/polling-units/${wardId}`,
    }),
    newsLetter: builder.mutation({
      query: (data) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body: data,
      }),
    }),

  })

})


export const { useRegisterMemberMutation, useGetAllLgasQuery, useGetAllWardsQuery, useGetAllPollingUnitsQuery, useNewsLetterMutation } = membershipApi