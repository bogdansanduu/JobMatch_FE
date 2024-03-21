import axios, { AxiosError, Method, RawAxiosRequestConfig } from "axios";

import AuthApi from "./AuthApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getToken, setToken } from "../store/slices/AuthSlice";

const authApi = new AuthApi();

//TODO CHANGE THIS
//make a class or use env variables
const baseUrl = "http://localhost:8080";

const useSendAuthRequest = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getToken);

  return async (method: Method, endpoint: string, data?: any) => {
    const url = `${baseUrl}${endpoint}`;

    const config: RawAxiosRequestConfig = {
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios(config);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      //check if the error is due to a 401 response
      if (axiosError.response?.status === 401) {
        //token expired, attempt to refresh
        try {
          const {
            data: { accessToken: newAccessToken },
          } = await authApi.refreshToken();

          // Dispatch an action to update the access token in Redux store
          dispatch(setToken(newAccessToken));

          config.headers = { Authorization: `Bearer ${newAccessToken}` };

          const refreshedResponse = await axios(config);
          return refreshedResponse.data;
        } catch (refreshError) {
          //handle error refreshing token
          console.log("Error refreshing token:", refreshError);
        }
      } else {
        //handle other types of errors
        console.log("Non-401 error:", axiosError.response?.data);
        throw axiosError; // Rethrow the error
      }
    }
  };
};

export default useSendAuthRequest;
