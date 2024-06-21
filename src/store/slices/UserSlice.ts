import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import AppApi from "../../server/api/AppApi";
import { CompanySimpleType } from "./CompanySlice";
import { JobApplicationType } from "./JobApplicationSlice";
import { revertAll } from "../actions";
import { UploadResumeDto } from "../../server/api/UserApi";
import { Roles } from "../../utils/constants/roles";

export interface UserState {
  currentUser: UserType;
  users: UserType[];
}

export interface ResumeFile {
  id: string;
  uploadedAt: Date;
  fileName: string;
  fileKey: string;
}

export type UserType = {
  id: number;
  role: Roles;
  isBanned: boolean;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  currentPosition?: string;
  following: UserType[];
  followers: UserType[];
  jobApplications: JobApplicationType[];
  jobsSaved: JobApplicationType[];
  company?: CompanySimpleType;
  country: string;
  city: string;
  state: string;
  resume: string;
  resumeFile?: ResumeFile;
};

export const EMPTY_USER: UserType = {
  id: 0,
  role: Roles.USER,
  isBanned: false,
  email: "",
  firstName: "",
  lastName: "",
  profilePicture: "",
  currentPosition: "",
  following: [],
  followers: [],
  jobApplications: [],
  jobsSaved: [],
  company: undefined,
  country: "",
  city: "",
  state: "",
  resume: "",
  resumeFile: undefined,
};

const initialState: UserState = {
  currentUser: EMPTY_USER,
  users: [],
};

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async ({ banned = false }: { banned: boolean }) => {
    const userApi = AppApi.getUserApi();

    return await userApi.getAllUsers(banned);
  }
);

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

export const uploadUserResume = createAsyncThunk(
  "user/uploadUserResume",
  async ({
    userId,
    resumeDto,
  }: {
    userId: number;
    resumeDto: UploadResumeDto;
  }) => {
    const userApi = AppApi.getUserApi();

    return await userApi.uploadUserResume(userId, resumeDto);
  }
);

export const deleteUserResume = createAsyncThunk(
  "user/deleteUserResume",
  async (userId: number) => {
    const userApi = AppApi.getUserApi();

    return await userApi.deleteUserResume(userId);
  }
);

export const banUser = createAsyncThunk(
  "user/banUser",
  async ({ userId, banned }: { userId: number; banned: boolean }) => {
    const userApi = AppApi.getUserApi();

    return await userApi.banUser(userId, banned);
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
    //UPLOAD RESUME
    builder.addCase(uploadUserResume.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(uploadUserResume.rejected, (state) => {
      state.currentUser = EMPTY_USER;
    });
    //DELETE USER RESUME
    builder.addCase(deleteUserResume.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(deleteUserResume.rejected, (state) => {
      state.currentUser = EMPTY_USER;
    });
    //BAN USER
    builder.addCase(banUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    });
    builder.addCase(banUser.rejected, (state) => {
      console.log("Error banning user");
    });
  },
});

export const { setCurrentUser, setUsers } = UserSlice.actions;
export const getCurrentUser = (state: RootState) => state.user.currentUser;
export const getUsers = (state: RootState) => state.user.users;
export default UserSlice.reducer;
