import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { logout } from '../features/authSlice'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set('Accept', 'application/json')
    return headers
  },
})

export const baseQueryWithLogout: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    // If we get a 401 or 403, it means the token is invalid, expired or unauthorized
    api.dispatch(logout())
    
    // Optional: Could redirect here, but dispatching logout will trigger 
    // the redirect in ProtectedRoute.tsx
  }
  
  return result
}
