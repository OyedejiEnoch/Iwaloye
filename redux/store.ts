import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/authSlice";
import { authApi } from "./api/authApi";
import { membershipApi } from './api/membershipApi';
import { detailsApi } from './api/detailsApi';
import { adminApi } from './api/adminApi';

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            [authApi.reducerPath]: authApi.reducer,
            [membershipApi.reducerPath]: membershipApi.reducer,
            [detailsApi.reducerPath]: detailsApi.reducer,
            [adminApi.reducerPath]: adminApi.reducer,
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware()
                .concat([authApi.middleware, membershipApi.middleware, detailsApi.middleware, adminApi.middleware])
        }
    })
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']