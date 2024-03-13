import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EMPTY_USER, UserType } from "./UserSlice";
import { RootState } from "../store";

export interface AuthState {
  jwtToken: string;
  loggedUser: UserType | null;
}

const initialState: AuthState = {
  jwtToken: "",
  loggedUser: null,
};

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
});

export const { setToken, setUser, logout } = AuthSlice.actions;
export const getToken = (state: RootState) => state.auth.jwtToken;
export const getLoggedUser = (state: RootState) => state.auth.loggedUser;
export default AuthSlice.reducer;
