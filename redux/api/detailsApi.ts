import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const detailsApi = createApi({
    reducerPath: 'detailsApi',
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
        getAllVision: builder.query({
            query: () => '/vision/all',
        }),
        getSingleVision: builder.query({
            query: (id) => `/vision/${id}`,
        }),
        getAllNews: builder.query({
            query: () => '/news',
        }),
        getSingleNews: builder.query({
            query: (id) => `/news/${id}`,
        }),
        getAllLeaders: builder.query({
            query: () => '/leaders',
        }),
        getAllCalenders: builder.query({
            query: () => '/campaign-calendar',
        }),
        // POST api/payment
        createPayment: builder.mutation({
            query: (data) => ({
                url: '/payment',
                method: 'POST',
                body: data,
            }),
        }),
        // POST api/contact
        submitContact: builder.mutation({
            query: (data) => ({
                url: '/contact',
                method: 'POST',
                body: data,
            }),
        }),
        // Albums
        getAllAlbums: builder.query<any, void>({
            query: () => '/albums',
        }),
        getSingleAlbum: builder.query<any, string>({
            query: (slug) => `/albums/${slug}`,
        }),
    }),
})

export const { 
    useGetAllVisionQuery, 
    useGetAllNewsQuery, 
    useGetSingleNewsQuery, 
    useGetSingleVisionQuery, 
    useGetAllLeadersQuery,
    useGetAllCalendersQuery,
    useCreatePaymentMutation,
    useSubmitContactMutation,
    useGetAllAlbumsQuery,
    useGetSingleAlbumQuery,
} = detailsApi