import BaseApi from "./BaseApi";

class JobSavedApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("job-saved");
  }

  async getAllSavedJobs() {
    return this.baseApi.sendRequest("GET", "/all");
  }

  async saveJob(userId: number, jobId: number) {
    return this.baseApi.sendRequest("POST", "/save", { userId, jobId });
  }

  async unsaveJob(userId: number, jobId: number) {
    return this.baseApi.sendRequest("DELETE", "/unsave", { userId, jobId });
  }

  async getSavedJobsByUser(userId: number) {
    return this.baseApi.sendRequest("GET", `/user/${userId}`);
  }
}

export default JobSavedApi;
