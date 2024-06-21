import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserType } from "./UserSlice";
import { CompanyType } from "./CompanySlice";
import { RootState } from "../store";
import AppApi from "../../server/api/AppApi";
import { revertAll } from "../actions";

export interface AuthState {
  accessToken?: string;
  loggedUser?: UserType;
  loggedCompany?: CompanyType;
}

const initialState: AuthState = {
  accessToken: undefined,
  loggedUser: undefined,
  loggedCompany: undefined,
};

//TODO add types
export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { dispatch }) => {
    const authApi = AppApi.getAuthApi();

    return await authApi.login(data);
  }
);

export const loginCompany = createAsyncThunk(
  "auth/loginCompany",
  async (data: { email: string; password: string }, { dispatch }) => {
    const authApi = AppApi.getAuthApi();

    return await authApi.loginCompany(data);
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const authApi = AppApi.getAuthApi();

  await authApi.logout();
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const authApi = AppApi.getAuthApi();

  const { accessToken } = await authApi.refreshAccessToken();

  return accessToken;
});

export const refreshTokenCompany = createAsyncThunk(
  "auth/refreshTokenCompany",
  async () => {
    const authApi = AppApi.getAuthApi();

    const { accessToken } = await authApi.refreshAccessTokenCompany();

    return accessToken;
  }
);

export const refreshCurrentUserData = createAsyncThunk<
  any,
  void,
  { state: RootState }
>("auth/refreshCurrentUserData", async (_, { dispatch, getState }) => {
  const authApi = AppApi.getUserApi();

  const loggedUserId = getState().auth.loggedUser?.id;

  if (!loggedUserId) {
    return;
  }

  return await authApi.getUserById(loggedUserId);
});

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setLoggedUser: (state, action: PayloadAction<UserType>) => {
      state.loggedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    //RESET STORE
    builder.addCase(revertAll, () => initialState);
    //LOGIN
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.loggedUser = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 403") {
        alert("User is banned");
      }

      if (action.error.message === "Request failed with status code 404") {
        alert("Invalid credentials");
      }

      state.accessToken = undefined;
      state.loggedUser = undefined;
      state.loggedCompany = undefined;
    });
    //LOGOUT
    builder.addCase(logout.fulfilled, (state) => {
      state.accessToken = undefined;
      state.loggedUser = undefined;
      state.loggedCompany = undefined;
    });
    builder.addCase(logout.rejected, (state) => {
      state.accessToken = undefined;
      state.loggedUser = undefined;
      state.loggedCompany = undefined;
    });
    //REFRESH TOKEN
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.accessToken = action.payload;
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.accessToken = undefined;
      state.loggedUser = undefined;
      state.loggedCompany = undefined;
    });
    //REFRESH CURRENT USER DATA
    builder.addCase(refreshCurrentUserData.fulfilled, (state, action) => {
      state.loggedUser = action.payload;
    });
    builder.addCase(refreshCurrentUserData.rejected, (state) => {
      state.accessToken = undefined;
      state.loggedUser = undefined;
      state.loggedCompany = undefined;
    });

    //COMPANY
    //LOGIN
    builder.addCase(loginCompany.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.loggedCompany = action.payload.company;
    });
    builder.addCase(loginCompany.rejected, (state, action) => {
      if (action.error.message === "Request failed with status code 403") {
        alert("Company is banned");
      }

      if (action.error.message === "Request failed with status code 404") {
        alert("Invalid credentials");
      }

      state.accessToken = undefined;
      state.loggedUser = undefined;
      state.loggedCompany = undefined;
    });
    //REFRESH TOKEN
    builder.addCase(refreshTokenCompany.fulfilled, (state, action) => {
      state.accessToken = action.payload;
    });
  },
});

export const { setToken, setLoggedUser } = AuthSlice.actions;
export const getToken = (state: RootState) => state.auth.accessToken;
export const getLoggedUser = (state: RootState) => state.auth.loggedUser;
export const getLoggedCompany = (state: RootState) => state.auth.loggedCompany;
export default AuthSlice.reducer;
