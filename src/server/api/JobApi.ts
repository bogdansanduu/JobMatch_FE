import BaseApi from "./BaseApi";

class JobApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("job");
  }

  async getAllJobsPaginated(page: number, limit: number, searchTerm?: string) {
    let endpoint = `/all-paginated?page=${page}&limit=${limit}`;

    if (searchTerm) {
      endpoint += `&searchTerm=${searchTerm}`;
    }

    return this.baseApi.sendRequest("GET", endpoint);
  }
}

export default JobApi;
