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
  //TODO add profile picture to register step
  profilePicture?: string;
  country: string;
  state: string;
  city: string;
}

class AuthApi {
  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi("auth");
  }

  register(data: RegisterParams) {
    return this.baseApi.sendRequest("PUT", "/register", data);
  }

  login(data: LoginParams) {
    return this.baseApi.sendRequest("POST", "/login", data);
  }

  logout() {
    return this.baseApi.sendRequest("POST", "/logout");
  }

  refreshAccessToken() {
    return this.baseApi.sendRequest("POST", "/refresh-token");
  }
}

export default AuthApi;
