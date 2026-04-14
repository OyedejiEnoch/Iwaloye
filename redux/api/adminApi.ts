import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApi = createApi({
    reducerPath: 'adminApi',
    tagTypes: ['News', 'Leaders', 'Faqs', 'Newsletter', 'Vision', 'Calendars', 'Movements', 'Admins', 'Albums'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // Vision
        getAllVision: builder.query<any, void>({
            query: () => '/admin/vision',
            providesTags: ['Vision'],
        }),
        getVisionById: builder.query<any, string>({
            query: (id) => `/admin/vision/${id}`,
            providesTags: (result, error, id) => [{ type: 'Vision', id }],
        }),
        createVision: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/vision',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Vision'],
        }),
        updateVision: builder.mutation<any, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `/admin/vision/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Vision'],
        }),
        deleteVision: builder.mutation<any, string>({
            query: (id) => ({
                url: `/admin/vision/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Vision'],
        }),

        // News
        getAllNews: builder.query<any, void>({
            query: () => '/admin/news',
            providesTags: ['News'],
        }),
        getNewsById: builder.query<any, string>({
            query: (id) => `/admin/news/${id}`,
            providesTags: (result, error, id) => [{ type: 'News', id }],
        }),
        createNews: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/news',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['News'],
        }),
        updateNews: builder.mutation<any, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `/admin/news/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['News'],
        }),
        deleteNews: builder.mutation<any, string>({
            query: (id) => ({
                url: `/admin/news/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['News'],
        }),

        // Leaders
        getAllLeaders: builder.query<any, void>({
            query: () => '/admin/leaders',
            providesTags: ['Leaders'],
        }),
        getLeaderById: builder.query<any, string>({
            query: (id) => `/admin/leaders/${id}`,
            providesTags: (result, error, id) => [{ type: 'Leaders', id }],
        }),
        createLeader: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/leaders',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Leaders'],
        }),
        updateLeader: builder.mutation<any, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `/admin/leaders/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Leaders'],
        }),
        deleteLeader: builder.mutation<any, string>({
            query: (id) => ({
                url: `/admin/leaders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Leaders'],
        }),

        // Campaign Calendars
        getAllCalenders: builder.query<any, void>({
            query: () => '/admin/campaign-calendar',
            providesTags: ['Calendars'],
        }),
        getCalenderById: builder.query<any, string>({
            query: (id) => `/admin/campaign-calendar/${id}`,
            providesTags: (result, error, id) => [{ type: 'Calendars', id }],
        }),
        createCalender: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/campaign-calendar',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Calendars'],
        }),
        updateCalender: builder.mutation<any, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `/admin/campaign-calendar/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Calendars'],
        }),
        deleteCalender: builder.mutation<any, string>({
            query: (id) => ({
                url: `/admin/campaign-calendar/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Calendars'],
        }),

        // FAQs
        getAllFaqs: builder.query<any, void>({
            query: () => '/admin/faqs',
            providesTags: ['Faqs'],
        }),
        getFaqById: builder.query<any, string>({
            query: (id) => `/admin/faqs/${id}`,
            providesTags: (result, error, id) => [{ type: 'Faqs', id }],
        }),
        createFaq: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/faqs',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Faqs'],
        }),
        updateFaq: builder.mutation<any, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `/admin/faqs/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Faqs'],
        }),
        deleteFaq: builder.mutation<any, string>({
            query: (id) => ({
                url: `/admin/faqs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Faqs'],
        }),

        // Newsletter
        getAllNewsletter: builder.query<any, void>({
            query: () => '/admin/newsletter',
            providesTags: ['Newsletter'],
        }),
        createNewsletter: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/newsletter',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Newsletter'],
        }),
        deleteNewsletter: builder.mutation<any, string>({
            query: (id) => ({
                url: `/admin/newsletter/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Newsletter'],
        }),
        sendNewsletter: builder.mutation<any, string>({
            query: (id) => ({
                url: `/admin/newsletter/${id}/send`,
                method: 'POST',
            }),
        }),

        // Movements
        getAllMovements: builder.query<any, void>({
            query: () => '/admin/movements',
            providesTags: ['Movements'],
        }),
        getMovementById: builder.query<any, string>({
            query: (id) => `/admin/movements/${id}`,
            providesTags: (result, error, id) => [{ type: 'Movements', id }],
        }),
        createMovement: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/movements',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Movements'],
        }),
        updateMovement: builder.mutation<any, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `/admin/movements/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Movements'],
        }),
        deleteMovement: builder.mutation<any, string>({
            query: (id) => ({
                url: `/admin/movements/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Movements'],
        }),
        getMovementVolunteers: builder.query<any, string>({
            query: (id) => `/admin/movements/${id}/volunteers`,
        }),

        // Volunteers
        getAllVolunteers: builder.query<any, void>({
            query: () => '/admin/volunteers',
        }),
        searchVolunteers: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/volunteers/search',
                method: 'POST',
                body: data,
            }),
        }),

        // Stats
        getAdminStats: builder.query<any, void>({
            query: () => '/admin/stats',
        }),

        // Admin Management
        getAllAdmins: builder.query<any, void>({
            query: () => '/admin/admins',
            providesTags: ['Admins'],
        }),
        createAdmin: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/admins',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Admins'],
        }),
        updateAdmin: builder.mutation<any, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `/admin/admins/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Admins'],
        }),
        deleteAdmin: builder.mutation<any, string>({
            query: (id) => ({
                url: `/admin/admins/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Admins'],
        }),

        // Settings
        getGeneralSettings: builder.query<any, void>({
            query: () => '/admin/settings/general',
        }),
        updateGeneralSettings: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/settings/general',
                method: 'PUT',
                body: data,
            }),
        }),
        changeAdminPassword: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/settings/security/change-admin-password',
                method: 'POST',
                body: data,
            }),
        }),

        // Albums
        getAllAlbums: builder.query<any, void>({
            query: () => '/admin/albums',
            providesTags: ['Albums'],
        }),
        getAlbumById: builder.query<any, string>({
            query: (id) => `/admin/albums/${id}`,
            providesTags: (result, error, id) => [{ type: 'Albums', id }],
        }),
        createAlbum: builder.mutation<any, any>({
            query: (data) => ({
                url: '/admin/albums',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Albums'],
        }),
        updateAlbum: builder.mutation<any, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `/admin/albums/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Albums'],
        }),
        deleteAlbum: builder.mutation<any, string>({
            query: (id) => ({
                url: `/admin/albums/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Albums'],
        }),
    }),
})

export const {
    // Vision
    useGetAllVisionQuery,
    useGetVisionByIdQuery,
    useCreateVisionMutation,
    useUpdateVisionMutation,
    useDeleteVisionMutation,

    // News
    useGetAllNewsQuery,
    useGetNewsByIdQuery,
    useCreateNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation,

    // Leaders
    useGetAllLeadersQuery,
    useGetLeaderByIdQuery,
    useCreateLeaderMutation,
    useUpdateLeaderMutation,
    useDeleteLeaderMutation,

    // Campaign Calenders
    useGetAllCalendersQuery,
    useGetCalenderByIdQuery,
    useCreateCalenderMutation,
    useUpdateCalenderMutation,
    useDeleteCalenderMutation,

    // FAQs
    useGetAllFaqsQuery,
    useGetFaqByIdQuery,
    useCreateFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation,

    // Newsletter
    useGetAllNewsletterQuery,
    useCreateNewsletterMutation,
    useDeleteNewsletterMutation,
    useSendNewsletterMutation,

    // Movements
    useGetAllMovementsQuery,
    useGetMovementByIdQuery,
    useCreateMovementMutation,
    useUpdateMovementMutation,
    useDeleteMovementMutation,
    useGetMovementVolunteersQuery,

    // Volunteers
    useGetAllVolunteersQuery,
    useSearchVolunteersMutation,

    // Stats
    useGetAdminStatsQuery,

    // Admin
    useGetAllAdminsQuery,
    useCreateAdminMutation,
    useUpdateAdminMutation,
    useDeleteAdminMutation,

    // Settings
    useGetGeneralSettingsQuery,
    useUpdateGeneralSettingsMutation,
    useChangeAdminPasswordMutation,

    // Albums
    useGetAllAlbumsQuery,
    useGetAlbumByIdQuery,
    useCreateAlbumMutation,
    useUpdateAlbumMutation,
    useDeleteAlbumMutation,
} = adminApi