import BaseApi from "./BaseApi";

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

class AuthApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("auth");
  }

  register(data: RegisterParams) {
    return this.baseApi.sendRequest("POST", "/register", data);
  }

  login(data: LoginParams) {
    return this.baseApi.sendRequest("POST", "/login", data);
  }

  logout() {
    return this.baseApi.sendRequest("POST", "/logout");
  }
}

export default AuthApi;
