import BaseApi from "./BaseApi";

class UserApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("user");
  }

  async getUserById(id: number) {
    return this.baseApi.sendRequest("GET", `/${id}`);
  }

  getAllUsers() {
    return this.baseApi.sendRequest("GET", "/all");
  }

  searchByNameAndEmail(searchTerm: string) {
    return this.baseApi.sendRequest("GET", `/search?searchTerm=${searchTerm}`);
  }

  addContact(userId: number, contactId: number) {
    return this.baseApi.sendRequest("PUT", `/add-contact`, {
      userId,
      contactId,
    });
  }

  removeContact(userId: number, contactId: number) {
    return this.baseApi.sendRequest("PUT", `/remove-contact`, {
      userId,
      contactId,
    });
  }
}

export default UserApi;
