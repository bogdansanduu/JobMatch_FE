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

  async getAllJobsPaginated(page: number, limit: number, searchTerm?: string) {
    let endpoint = `/all-paginated?page=${page}&limit=${limit}`;

    if (searchTerm) {
      endpoint += `&searchTerm=${searchTerm}`;
    }

    return this.baseApi.sendRequest("GET", endpoint);
  }

  async getAllJobsByCompany(companyId: number) {
    return this.baseApi.sendRequest("GET", `/all-company/${companyId}`);
  }

  async createJobListing(data: CreateJobListingDto) {
    return this.baseApi.sendRequest("POST", "/", data);
  }
}

export default JobApi;
