import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

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
    const jar = new CookieJar();

    this.authApi = wrapper(
      axios.create({
        baseURL: "http://localhost:8080/auth",
        jar,
        withCredentials: true,
      })
    );
  }

  register(data: RegisterParams) {
    return this.authApi.post("/register", data);
  }

  login(data: LoginParams) {
    return this.authApi.post("/login", data);
  }

  logout() {
    return this.authApi.post("/logout");
  }

  refreshToken() {
    return this.authApi.post("/refreshToken");
  }
}

export default AuthApi;
