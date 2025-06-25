import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { authSlice } from "../features/auth/AuthSlice/AuthSlice";
import { authApi } from "../features/auth/authApi/authApi";
import cartSlice from './../features/product/productSlice/productSlice';
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'] 
};

const cartPersistConfig = {
  key: 'carts',
  storage,
};
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  cart: persistReducer(cartPersistConfig, cartSlice), 
});

export const store = configureStore({
    reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);
