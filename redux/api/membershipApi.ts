import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithLogout } from './baseQuery'


export const membershipApi = createApi({
  reducerPath: 'membershipApi',
  baseQuery: baseQueryWithLogout,
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