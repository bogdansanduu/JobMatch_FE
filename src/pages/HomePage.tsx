import React, { useEffect } from "react";

import useSendAuthRequest from "../api/AppApi";

const HomePage = () => {
  const sendAuthRequest = useSendAuthRequest();

  useEffect(() => {
    (async () => {
      const data = await sendAuthRequest("GET", "/users");
      console.log(data);
    })();
  }, []);

  return <div>Home</div>;
};

export default HomePage;
