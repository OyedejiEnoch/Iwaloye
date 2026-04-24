import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  user: any | null
  role: 'super-admin' | 'admin' | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  role: typeof window !== 'undefined' ? (localStorage.getItem('role') as 'super-admin' | 'admin') || null : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; user: any; role: 'super-admin' | 'admin' }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.role = action.payload.role
      state.isAuthenticated = true

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('role', action.payload.role)
      }
    },
    logout: (state) => {
      state.token = null
      state.user = null
      state.role = null
      state.isAuthenticated = false

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
      }
    },
  },
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer
