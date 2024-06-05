import BaseApi from "./BaseApi";
import { APPLICATION_STATUS } from "../../store/slices/JobApplicationSlice";

class JobApplicationApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("job-application");
  }

  async getAllJobApplications() {
    return this.baseApi.sendRequest("GET", "/all");
  }

  async getJobApplicationsByUser(userId: number) {
    return this.baseApi.sendRequest("GET", `/user/${userId}`);
  }

  async getJobApplicationsByJob(jobId: number) {
    return this.baseApi.sendRequest("GET", `/job/${jobId}`);
  }

  async applyForJob(userId: number, jobId: number) {
    return this.baseApi.sendRequest("POST", `/apply/${userId}/${jobId}`);
  }

  async reviewJobApplication(
    jobApplicationId: number,
    status: APPLICATION_STATUS,
    observations: string
  ) {
    return this.baseApi.sendRequest("PUT", `/review/${jobApplicationId}`, {
      status,
      observations,
    });
  }
}

export default JobApplicationApi;
