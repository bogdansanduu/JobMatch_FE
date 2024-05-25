import { UserType } from "./UserSlice";
import { JobType } from "./JobSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AppApi from "../../server/api/AppApi";

const JobApplicationStatus = "123";

export interface JobApplicationType {
  id: number;
  job: JobType;
  applicant: UserType;
  status: string;
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
  async ({
    userId,
    jobId,
    resume,
  }: {
    userId: number;
    jobId: number;
    resume: string;
  }) => {
    const jobApplicationApi = AppApi.getJobApplicationApi();

    return await jobApplicationApi.applyForJob(userId, jobId, resume);
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
    //APPLY FOR JOB
    builder.addCase(applyForJob.fulfilled, (state, action) => {
      state.jobApplications.push(action.payload);
    });
    builder.addCase(applyForJob.rejected, (state, action) => {
      console.log(action.error.message);
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
