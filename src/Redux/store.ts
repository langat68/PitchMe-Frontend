import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slices/authSlice';
import resumeReducer from './slices/resumeSlice';

// 👇 combine all slices
const rootReducer = combineReducers({
  auth: authReducer,
  resume: resumeReducer,
});

// 👇 redux-persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'resume'], // state slices to persist
};

// 👇 persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 👇 create store with middleware that ignores redux-persist actions
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

// 👇 persistor for redux-persist
export const persistor = persistStore(store);

// 👇 types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
