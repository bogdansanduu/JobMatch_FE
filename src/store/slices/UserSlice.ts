import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

export interface UserState {
  currentUser: UserType;
  users: any[];
}

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const EMPTY_USER: UserType = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
};

const initialState: UserState = {
  currentUser: EMPTY_USER,
  users: [],
};

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
});

export const { setCurrentUser, setUsers } = UserSlice.actions;
export const getCurrentUser = (state: RootState) => state.user.currentUser;
export const getUsers = (state: RootState) => state.user.users;
export default UserSlice.reducer;
