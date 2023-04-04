import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ChartTypeSlice from "../features/ChartTypeSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "../services/User";
import { TransactionApi } from "../services/Transaction";


export const store = configureStore({
    reducer : {
        ChartTypeSlice,
        [userApi.reducerPath] : userApi.reducer,
        [TransactionApi.reducerPath] : TransactionApi.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(TransactionApi.middleware)
})

setupListeners(store.dispatch);