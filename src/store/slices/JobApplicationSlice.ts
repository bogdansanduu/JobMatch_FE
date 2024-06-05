import { UserType } from "./UserSlice";
import { JobType } from "./JobSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AppApi from "../../server/api/AppApi";
import { revertAll } from "../actions";

export enum APPLICATION_STATUS {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface JobApplicationType {
  id: number;
  job: JobType;
  applicant: UserType;
  status: APPLICATION_STATUS;
  observations?: string;
  resume: string;
  applicationDate: string;
  updateDate: string;
}

export interface JobApplicationState {
  jobApplications: JobApplicationType[];
  currentJobApplication?: JobApplicationType;
}

const initialState: JobApplicationState = {
  jobApplications: [],
  currentJobApplication: undefined,
};

export const applyForJob = createAsyncThunk(
  "job-application/applyForJob",
  async ({ userId, jobId }: { userId: number; jobId: number }) => {
    const jobApplicationApi = AppApi.getJobApplicationApi();

    return await jobApplicationApi.applyForJob(userId, jobId);
  }
);

export const reviewJobApplication = createAsyncThunk(
  "job-application/reviewJobApplication",
  async ({
    jobApplicationId,
    status,
    observations,
  }: {
    jobApplicationId: number;
    status: APPLICATION_STATUS;
    observations: string;
  }) => {
    const jobApplicationApi = AppApi.getJobApplicationApi();

    return await jobApplicationApi.reviewJobApplication(
      jobApplicationId,
      status,
      observations
    );
  }
);

export const getJobApplicationsByUser = createAsyncThunk(
  "job-application/getJobApplicationsByUser",
  async (userId: number) => {
    const jobApplicationApi = AppApi.getJobApplicationApi();

    return await jobApplicationApi.getJobApplicationsByUser(userId);
  }
);

export const getJobApplicationsByJob = createAsyncThunk(
  "job-application/getJobApplicationsByJob",
  async (jobId: number) => {
    const jobApplicationApi = AppApi.getJobApplicationApi();

    return await jobApplicationApi.getJobApplicationsByJob(jobId);
  }
);

export const JobApplicationSlice = createSlice({
  name: "jobApplication",
  initialState,
  reducers: {
    setJobApplications: (state, action) => {
      state.jobApplications = action.payload;
    },
    setCurrentJobApplication: (state, action) => {
      state.currentJobApplication = action.payload;
    },
  },
  extraReducers: (builder) => {
    //RESET STORE
    builder.addCase(revertAll, () => initialState);
    //APPLY FOR JOB
    builder.addCase(applyForJob.fulfilled, (state, action) => {
      state.jobApplications.push(action.payload);
    });
    builder.addCase(applyForJob.rejected, (state, action) => {
      state.currentJobApplication = undefined;
    });
    //GET JOB APPLICATIONS BY USER
    builder.addCase(getJobApplicationsByUser.fulfilled, (state, action) => {
      state.jobApplications = action.payload;
    });
    builder.addCase(getJobApplicationsByUser.rejected, (state, action) => {
      state.jobApplications = [];
    });
    //GET JOB APPLICATIONS BY JOB
    builder.addCase(getJobApplicationsByJob.fulfilled, (state, action) => {
      state.jobApplications = action.payload;
    });
    builder.addCase(getJobApplicationsByJob.rejected, (state, action) => {
      state.jobApplications = [];
    });
    //REVIEW JOB APPLICATION
    builder.addCase(reviewJobApplication.fulfilled, (state, action) => {
      state.currentJobApplication = action.payload;
      state.jobApplications = state.jobApplications.map((jobApplication) =>
        jobApplication.id === action.payload.id
          ? action.payload
          : jobApplication
      );
    });
    builder.addCase(reviewJobApplication.rejected, (state, action) => {
      state.currentJobApplication = undefined;
    });
  },
});

export const { setJobApplications, setCurrentJobApplication } =
  JobApplicationSlice.actions;
export const getJobApplications = (state: RootState) =>
  state.jobApplication.jobApplications;
export const getCurrentJobApplication = (state: RootState) =>
  state.jobApplication.currentJobApplication;
export default JobApplicationSlice.reducer;
