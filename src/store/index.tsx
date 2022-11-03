import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import authSlice from "./slices/authSlice";
import bookmarkSlice from "./slices/bookmarkSlice";

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    auth: authSlice,
    bookmark: bookmarkSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);