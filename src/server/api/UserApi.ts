import BaseApi from "./BaseApi";

class UserApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("user");
  }

  getAllUsers() {
    return this.baseApi.sendRequest("GET", "/all");
  }
}

export default UserApi;
