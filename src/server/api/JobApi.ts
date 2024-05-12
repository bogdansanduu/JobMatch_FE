import BaseApi from "./BaseApi";

class JobApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("job");
  }

  async getAllJobs() {
    return this.baseApi.sendRequest("GET", "/all");
  }
}

export default JobApi;
