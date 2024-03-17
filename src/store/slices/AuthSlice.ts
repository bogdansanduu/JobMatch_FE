import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserType } from "./UserSlice";
import { RootState } from "../store";
import AuthApi from "../../api/AuthApi";

export interface AuthState {
  jwtToken: string | null;
  loggedUser: UserType | null;
}

const initialState: AuthState = {
  jwtToken: null,
  loggedUser: null,
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
      state.jwtToken = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.loggedUser = action.payload;
    },
    logout: (state) => {
      state.jwtToken = null;
      state.loggedUser = null;

      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.jwtToken = action.payload.access_token;
      state.loggedUser = action.payload.user;
    });
    builder.addCase(login.rejected, (state) => {
      console.log("Login failed");
      state.jwtToken = "";
      state.loggedUser = null;
    });
  },
});

export const { setToken, setUser, logout } = AuthSlice.actions;
export const getToken = (state: RootState) => state.auth.jwtToken;
export const getLoggedUser = (state: RootState) => state.auth.loggedUser;
export default AuthSlice.reducer;
