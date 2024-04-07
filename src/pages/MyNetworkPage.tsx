import React, { useEffect } from "react";

import AppApi from "../server/api/AppApi";

const userApi = AppApi.getUserApi();

const MyNetworkPage = () => {
  useEffect(() => {
    (async () => {
      const data = await userApi.getAllUsers();
      console.log(data);
    })();
  }, []);

  return <div>My Network</div>;
};

export default MyNetworkPage;
