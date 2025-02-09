import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../pages/utility/services/products.service";
import searchFilterReducer from '../shared/utility/features/searchFilterSlice'
export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        searchFilter: searchFilterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
          productApi.middleware,
        ]),
})