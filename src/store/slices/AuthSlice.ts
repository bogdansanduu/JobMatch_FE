import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserType } from "./UserSlice";
import { RootState } from "../store";
import AuthApi from "../../api/AuthApi";

export interface AuthState {
  accessToken?: string;
  loggedUser?: UserType;
}

const initialState: AuthState = {
  accessToken: undefined,
  loggedUser: undefined,
};

const authApi = new AuthApi();

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { dispatch }) => {
    const response = await authApi.login(data);

    return response.data;
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.loggedUser = action.payload;
    },
    logout: (state) => {
      state.accessToken = undefined;
      state.loggedUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.loggedUser = action.payload.user;
    });
    builder.addCase(login.rejected, (state) => {
      state.accessToken = undefined;
      state.loggedUser = undefined;
    });
  },
});

export const { setToken, setUser, logout } = AuthSlice.actions;
export const getToken = (state: RootState) => state.auth.accessToken;
export const getLoggedUser = (state: RootState) => state.auth.loggedUser;
export default AuthSlice.reducer;
