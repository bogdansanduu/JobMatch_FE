import { JobType } from "./JobSlice";
import { UserType } from "./UserSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AppApi from "../../server/api/AppApi";
import { RootState } from "../store";
import { revertAll } from "../actions";

export interface JobSavedType {
  id: number;
  job: JobType;
  user: UserType;
}

export interface JobSavedState {
  jobsSaved: JobSavedType[];
}

const initialState: JobSavedState = {
  jobsSaved: [],
};

export const getSavedJobsByUser = createAsyncThunk(
  "jobSaved/getSavedJobsByUser",
  async (userId: number) => {
    const jobSavedApi = AppApi.getJobSavedApi();

    return await jobSavedApi.getSavedJobsByUser(userId);
  }
);

export const saveJob = createAsyncThunk(
  "jobSaved/saveJob",
  async ({ userId, jobId }: { userId: number; jobId: number }) => {
    const jobSavedApi = AppApi.getJobSavedApi();

    return await jobSavedApi.saveJob(userId, jobId);
  }
);

export const unsaveJob = createAsyncThunk(
  "jobSaved/unsaveJob",
  async ({ userId, jobId }: { userId: number; jobId: number }) => {
    const jobSavedApi = AppApi.getJobSavedApi();

    return await jobSavedApi.unsaveJob(userId, jobId);
  }
);

export const JobSavedSlice = createSlice({
  name: "jobSaved",
  initialState,
  reducers: {
    setJobsSaved: (state, action) => {
      state.jobsSaved = action.payload;
    },
  },
  extraReducers: (builder) => {
    //RESET STORE
    builder.addCase(revertAll, () => initialState);
    //GET ALL SAVED JOBS FOR USER
    builder.addCase(getSavedJobsByUser.fulfilled, (state, action) => {
      state.jobsSaved = action.payload;
    });
    builder.addCase(getSavedJobsByUser.rejected, (state, action) => {
      state.jobsSaved = [];
    });
    //SAVE JOB
    builder.addCase(saveJob.fulfilled, (state, action) => {
      state.jobsSaved.push(action.payload);
    });
    builder.addCase(saveJob.rejected, (state) => {
      state.jobsSaved = [];
    });
    //UNSAVE JOB
    builder.addCase(unsaveJob.fulfilled, (state, action) => {
      state.jobsSaved = state.jobsSaved.filter(
        (jobSaved) => jobSaved.job.id !== action.payload.jobId
      );
    });
    builder.addCase(unsaveJob.rejected, (state) => {
      state.jobsSaved = [];
    });
  },
});

export const { setJobsSaved } = JobSavedSlice.actions;
export const getJobsSaved = (state: RootState) => state.jobSaved.jobsSaved;
export default JobSavedSlice.reducer;
