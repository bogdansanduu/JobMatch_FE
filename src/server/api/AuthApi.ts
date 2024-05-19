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
  resume: string;
  //TODO add profile picture to register step
  profilePicture?: string;
  country: string;
  state: string;
  city: string;
}

interface RegisterCompanyParams {
  email: string;
  password: string;
  name: string;
  industry: string;
  country: string;
  state: string;
  city: string;
  ownerId: number;
}

class AuthApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("auth");
  }

  register(data: RegisterParams) {
    return this.baseApi.sendRequest("PUT", "/register", data);
  }

  registerCompany(data: RegisterCompanyParams) {
    return this.baseApi.sendRequest("PUT", "/register-company", data);
  }

  login(data: LoginParams) {
    return this.baseApi.sendRequest("POST", "/login", data);
  }

  loginCompany(data: LoginParams) {
    return this.baseApi.sendRequest("POST", "/login-company", data);
  }

  logout() {
    return this.baseApi.sendRequest("POST", "/logout");
  }

  refreshAccessToken() {
    return this.baseApi.sendRequest("POST", "/refresh-token");
  }

  refreshAccessTokenCompany() {
    return this.baseApi.sendRequest("POST", "/refresh-token-company");
  }
}

export default AuthApi;
