import BaseApi from "./BaseApi";

export interface CreateJobListingDto {
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
  companyId: number;
}

class JobApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("job");
  }

  getAllJobsPaginated(page: number, limit: number, searchTerm?: string) {
    let endpoint = `/all-paginated?page=${page}&limit=${limit}`;

    if (searchTerm) {
      endpoint += `&searchTerm=${searchTerm}`;
    }

    return this.baseApi.sendRequest("GET", endpoint);
  }

  getAllJobs() {
    return this.baseApi.sendRequest("GET", "/all");
  }

  getJobById(jobId: number) {
    return this.baseApi.sendRequest("GET", `/${jobId}`);
  }

  getAllJobsByCompany(companyId: number) {
    return this.baseApi.sendRequest("GET", `/all-company/${companyId}`);
  }

  createJobListing(data: CreateJobListingDto) {
    return this.baseApi.sendRequest("POST", "/", data);
  }

  deleteJobListing(jobId: number) {
    return this.baseApi.sendRequest("DELETE", `/${jobId}`);
  }
}

export default JobApi;
