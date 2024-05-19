import axios, {
  AxiosError,
  AxiosInstance,
  Method,
  RawAxiosRequestConfig,
} from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

import { store } from "../../store/store";
import { setToken } from "../../store/slices/AuthSlice";

export class BaseApi {
  private readonly axiosInstance: AxiosInstance;
  private readonly baseUrl: string;

  constructor(url: string = "") {
    const jar = new CookieJar();
    this.baseUrl = `${
      process.env.REACT_APP_API_URL || "http://localhost:3000"
    }/${url}`;

    this.axiosInstance = wrapper(
      axios.create({
        baseURL: this.baseUrl,
        jar,
        withCredentials: true,
      })
    );
  }

  sendRequest = async (method: Method, endpoint: string, data?: any) => {
    const accessToken = store.getState().auth.accessToken;

    let refreshUrl = "";

    const loggedUser = store.getState().auth.loggedUser;
    const loggedCompany = store.getState().auth.loggedCompany;

    //TODO move in constants
    if (loggedUser) {
      refreshUrl = "/auth/refresh-token";
    }
    if (loggedCompany) {
      refreshUrl = "/auth/refresh-token-company";
    }

    const config: RawAxiosRequestConfig = {
      method,
      url: endpoint,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await this.axiosInstance(config);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (!refreshUrl) {
        throw axiosError;
      }

      //handle error response
      if (axiosError.response?.status === 401) {
        //token expired, attempt to refresh
        try {
          const {
            data: { accessToken: newAccessToken },
          } = await this.axiosInstance.request({
            baseURL: process.env.REACT_APP_API_URL,
            url: refreshUrl,
            method: "POST",
          });

          //dispatch an action to update the access token in Redux store
          store.dispatch(setToken(newAccessToken));

          //update Authorization header with new access token
          config.headers = {
            Authorization: `Bearer ${newAccessToken}`,
          };

          //retry the request with the new access token
          const refreshedResponse = await this.axiosInstance(config);
          return refreshedResponse.data;
        } catch (refreshError) {
          console.log("Error refreshing token:", refreshError);
        }
      } else {
        console.log("Non-401 error:", axiosError.response?.data);
        throw axiosError;
      }
    }
  };
}

export default BaseApi;
