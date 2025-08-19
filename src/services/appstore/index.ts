import storage from "redux-persist/lib/storage";
import combineReducers from "./reducer/combineReducer";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REGISTER,
  PAUSE,
  REHYDRATE,
  PERSIST,
  PURGE,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers);

const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(appStore);

export { appStore, persistor };
