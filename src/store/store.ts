import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import userReducer from "./slices/UserSlice";
import authReducer from "./slices/AuthSlice";
import uiReducer from "./slices/UISlice";
import postReducer from "./slices/PostSlice";
import jobReducer from "./slices/JobSlice";
import jobApplicationReducer from "./slices/JobApplicationSlice";
import jobSavedReducer from "./slices/JobSavedSlice";
import companyReducer from "./slices/CompanySlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  ui: uiReducer,
  post: postReducer,
  job: jobReducer,
  jobApplication: jobApplicationReducer,
  jobSaved: jobSavedReducer,
  company: companyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
