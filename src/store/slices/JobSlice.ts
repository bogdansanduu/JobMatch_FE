import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CompanyType } from "./CompanySlice";
import AppApi from "../../server/api/AppApi";
import { RootState } from "../store";
import { GetRecommendationsDto } from "../../server/api/RecommendationApi";
import { CreateJobListingDto } from "../../server/api/JobApi";

export interface JobType {
  id: number;
  title: string;
  description: string;
  category: string;
  country: string;
  state: string;
  city: string;
  lat: number;
  lng: number;
  responsibilities: string;
  minimumQualifications: string;
  preferredQualifications: string;
  createdAt: string;
  updatedAt: string;
  company: CompanyType;
}

export interface JobState {
  jobs: JobType[];
  recommendedJobs: JobType[];
  totalJobsCount: number;
  currentJob?: JobType;
}

const initialState: JobState = {
  jobs: [],
  recommendedJobs: [],
  totalJobsCount: 0,
  currentJob: undefined,
};

export const getAllJobsPaginated = createAsyncThunk(
  "job/getAllJobs",
  async ({
    page,
    limit,
    searchTerm,
  }: {
    page: number;
    limit: number;
    searchTerm?: string;
  }) => {
    const jobApi = AppApi.getJobApi();

    return await jobApi.getAllJobsPaginated(page, limit, searchTerm);
  }
);

export const getAllJobsByCompany = createAsyncThunk(
  "job/getAllJobsByCompany",
  async (companyId: number) => {
    const jobApi = AppApi.getJobApi();

    return await jobApi.getAllJobsByCompany(companyId);
  }
);

export const createJobListing = createAsyncThunk(
  "job/createJobListing",
  async (data: CreateJobListingDto) => {
    const jobApi = AppApi.getJobApi();

    return await jobApi.createJobListing(data);
  }
);

export const getJobRecommendations = createAsyncThunk(
  "job/getJobRecommendations",
  async (data: GetRecommendationsDto) => {
    const jobApi = AppApi.getRecommendationApi();

    return await jobApi.getRecommendations(data);
  }
);

export const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GET ALL JOBS
    builder.addCase(
      getAllJobsPaginated.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: JobType[];
          currentPage: number;
          totalItems: number;
        }>
      ) => {
        const { data, currentPage, totalItems } = action.payload;

        if (currentPage === 1) {
          state.jobs = [];
        }

        state.jobs = [...state.jobs, ...data];
        state.totalJobsCount = totalItems;
      }
    );
    builder.addCase(getAllJobsPaginated.rejected, (state) => {
      state.jobs = [];
    });
    //GET ALL JOBS BY COMPANY
    builder.addCase(
      getAllJobsByCompany.fulfilled,
      (state, action: PayloadAction<JobType[]>) => {
        state.jobs = action.payload;
      }
    );
    builder.addCase(getAllJobsByCompany.rejected, (state) => {
      state.jobs = [];
    });
    //CREATE JOB LISTING
    builder.addCase(
      createJobListing.fulfilled,
      (state, action: PayloadAction<JobType>) => {
        state.currentJob = action.payload;
      }
    );
    builder.addCase(createJobListing.rejected, (state) => {
      console.log("Error creating job");
    });
    //GET RECOMMENDED JOBS
    builder.addCase(
      getJobRecommendations.fulfilled,
      (state, action: PayloadAction<JobType[]>) => {
        state.recommendedJobs = action.payload;
      }
    );
    builder.addCase(getJobRecommendations.rejected, (state) => {
      console.log("Error getting recommended jobs");
    });
  },
});

export const { setCurrentJob } = JobSlice.actions;
export const getJobs = (state: RootState) => state.job.jobs;

export const getRecommendedJobs = (state: RootState) =>
  state.job.recommendedJobs;
export const getTotalJobsCount = (state: RootState) => state.job.totalJobsCount;
export const getCurrentJob = (state: RootState) => state.job.currentJob;
export default JobSlice.reducer;
