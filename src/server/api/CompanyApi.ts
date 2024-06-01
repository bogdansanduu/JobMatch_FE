import BaseApi from "./BaseApi";

class CompanyApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("company");
  }

  searchByNameAndEmail(searchTerm: string) {
    return this.baseApi.sendRequest("GET", `/search?searchTerm=${searchTerm}`);
  }

  getCompanyById(id: number) {
    return this.baseApi.sendRequest("GET", `/${id}`);
  }
}

export default CompanyApi;
