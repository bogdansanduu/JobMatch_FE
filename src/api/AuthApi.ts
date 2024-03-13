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

//use environment variable
const authApi = axios.create({
  baseURL: "http://localhost:8080/auth",
});

export const register = (data: RegisterParams) => {
  return authApi.post("/register", data);
};

export const loginCaca = (data: LoginParams) => {
  return authApi.post("/login", data);
};
