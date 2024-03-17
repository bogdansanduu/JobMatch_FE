import axios from "axios";

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
  private authApi;

  constructor() {
    this.authApi = axios.create({
      baseURL: "http://localhost:8080/auth",
    });
  }

  register(data: RegisterParams) {
    return this.authApi.post("/register", data);
  }

  login(data: LoginParams) {
    return this.authApi.post("/login", data);
  }
}

export default AuthApi;
