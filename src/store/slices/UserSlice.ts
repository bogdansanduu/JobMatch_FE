import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import AppApi from "../../server/api/AppApi";

export interface UserState {
  currentUser: UserType;
  users: UserType[];
}

export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
};

export const EMPTY_USER: UserType = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  profilePicture: "",
};

const initialState: UserState = {
  currentUser: EMPTY_USER,
  users: [],
};

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { dispatch }) => {
    const userApi = AppApi.getUserApi();

    return await userApi.getAllUsers();
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.users = [];
    });
  },
});

export const { setCurrentUser, setUsers } = UserSlice.actions;
export const getCurrentUser = (state: RootState) => state.user.currentUser;
export const getUsers = (state: RootState) => state.user.users;
export default UserSlice.reducer;
