import React, { useEffect } from "react";
import AppApi from "../server/api/AppApi";

const baseApi = AppApi.getBaseApi();

const HomePage = () => {
  useEffect(() => {
    (async () => {
      const data = await baseApi.sendRequest("GET", "/helloWorld");
      console.log(data);
    })();
  }, []);

  return <div>Home</div>;
};

export default HomePage;
