import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import AppApi from "../../server/api/AppApi";
import { CompanySimpleType } from "./CompanySlice";
import { JobApplicationType } from "./JobApplicationSlice";
import { revertAll } from "../actions";

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
  jobApplications: JobApplicationType[];
  jobsSaved: JobApplicationType[];
  company?: CompanySimpleType;
  country: string;
  city: string;
  state: string;
  resume: string;
};

export const EMPTY_USER: UserType = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  profilePicture: "",
  following: [],
  followers: [],
  jobApplications: [],
  jobsSaved: [],
  company: undefined,
  country: "",
  city: "",
  state: "",
  resume: "",
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

export const removeConnection = createAsyncThunk(
  "user/removeConnection",
  async ({ userId, contactId }: { userId: number; contactId: number }) => {
    const userApi = AppApi.getUserApi();

    return await userApi.removeContact(userId, contactId);
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
    //RESET STORE
    builder.addCase(revertAll, () => initialState);
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
      state.currentUser = action.payload;
    });
    builder.addCase(addConnection.rejected, (state) => {
      console.log("Error adding connection");
    });
    //REMOVE CONNECTION
    builder.addCase(removeConnection.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(removeConnection.rejected, (state) => {
      console.log("Error removing connection");
    });
  },
});

export const { setCurrentUser, setUsers } = UserSlice.actions;
export const getCurrentUser = (state: RootState) => state.user.currentUser;
export const getUsers = (state: RootState) => state.user.users;
export default UserSlice.reducer;
