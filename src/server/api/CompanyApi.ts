import BaseApi from "./BaseApi";

class CompanyApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("company");
  }

  getAllCompanies(banned = false) {
    let endpoint = "/all";

    if (banned) {
      endpoint += "?banned=true";
    }

    return this.baseApi.sendRequest("GET", endpoint);
  }

  searchByNameAndEmail(searchTerm: string) {
    return this.baseApi.sendRequest("GET", `/search?searchTerm=${searchTerm}`);
  }

  getCompanyById(id: number) {
    return this.baseApi.sendRequest("GET", `/${id}`);
  }

  banCompany(companyId: number, banned: boolean) {
    return this.baseApi.sendRequest("PUT", `/ban/${companyId}`, {
      banned,
    });
  }
}

export default CompanyApi;
