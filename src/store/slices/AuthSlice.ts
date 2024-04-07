import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserType } from "./UserSlice";
import { RootState } from "../store";
import AppApi from "../../server/api/AppApi";

export interface AuthState {
  accessToken?: string;
  loggedUser?: UserType;
}

const initialState: AuthState = {
  accessToken: undefined,
  loggedUser: undefined,
};

//TODO add types
export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { dispatch }) => {
    const authApi = AppApi.getAuthApi();

    return await authApi.login(data);
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const authApi = AppApi.getAuthApi();

  await authApi.logout();
});

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
  },
  extraReducers: (builder) => {
    //LOGIN
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.loggedUser = action.payload.user;
    });
    builder.addCase(login.rejected, (state) => {
      state.accessToken = undefined;
      state.loggedUser = undefined;
    });

    //LOGOUT
    builder.addCase(logout.fulfilled, (state) => {
      state.accessToken = undefined;
      state.loggedUser = undefined;
    });
    builder.addCase(logout.rejected, (state) => {
      state.accessToken = undefined;
      state.loggedUser = undefined;
    });
  },
});

export const { setToken, setUser } = AuthSlice.actions;
export const getToken = (state: RootState) => state.auth.accessToken;
export const getLoggedUser = (state: RootState) => state.auth.loggedUser;
export default AuthSlice.reducer;
