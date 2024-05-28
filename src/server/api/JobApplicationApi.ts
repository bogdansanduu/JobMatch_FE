import BaseApi from "./BaseApi";

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

  async applyForJob(userId: number, jobId: number, resume: string) {
    return this.baseApi.sendRequest("POST", `/apply/${userId}/${jobId}`, {
      resume,
    });
  }
}

export default JobApplicationApi;
