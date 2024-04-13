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
  following: UserType[];
  followers: UserType[];
};

export const EMPTY_USER: UserType = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  profilePicture: "",
  following: [],
  followers: [],
};

const initialState: UserState = {
  currentUser: EMPTY_USER,
  users: [],
};

export const getAllUsers = createAsyncThunk("user/getAllUsers", async (_) => {
  const userApi = AppApi.getUserApi();

  return await userApi.getAllUsers();
});

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id: number) => {
    const userApi = AppApi.getUserApi();

    return await userApi.getUserById(id);
  }
);

export const addConnection = createAsyncThunk(
  "user/addConnection",
  async ({ userId, contactId }: { userId: number; contactId: number }) => {
    const userApi = AppApi.getUserApi();

    return await userApi.addContact(userId, contactId);
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
    //GET ALL USERS
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.users = [];
    });
    //GET USER BY ID
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(getUserById.rejected, (state) => {
      state.currentUser = EMPTY_USER;
    });
    //ADD CONNECTION
    builder.addCase(addConnection.fulfilled, (state, action) => {
      console.log("Connection added");
    });
    builder.addCase(addConnection.rejected, (state) => {
      console.log("Error adding connection");
    });
  },
});

export const { setCurrentUser, setUsers } = UserSlice.actions;
export const getCurrentUser = (state: RootState) => state.user.currentUser;
export const getUsers = (state: RootState) => state.user.users;
export default UserSlice.reducer;
