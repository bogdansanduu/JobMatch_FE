import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";
import ApplicationRouter from "./router/ApplicationRouter";

function App() {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={ApplicationRouter} />
      </React.StrictMode>
    </Provider>
  );
}

export default App;
