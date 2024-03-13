import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EMPTY_USER, UserType } from "./UserSlice";
import { RootState } from "../store";
import { loginCaca } from "../../api/AuthApi";

export interface AuthState {
  jwtToken: string;
  loggedUser: UserType | null;
}

const initialState: AuthState = {
  jwtToken: "",
  loggedUser: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { dispatch }) => {
    const response = await loginCaca(data);

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
      state.jwtToken = "";
      state.loggedUser = EMPTY_USER;

      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.jwtToken = action.payload.access_token;
      state.loggedUser = action.payload.user;
    });
    builder.addCase(login.rejected, (state) => {
      state.jwtToken = "";
      state.loggedUser = null;
    });
  },
});

export const { setToken, setUser, logout } = AuthSlice.actions;
export const getToken = (state: RootState) => state.auth.jwtToken;
export const getLoggedUser = (state: RootState) => state.auth.loggedUser;
export default AuthSlice.reducer;
