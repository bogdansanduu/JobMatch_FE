import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { store, persistor } from "./store/store";
import ApplicationRouter from "./router/ApplicationRouter";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <RouterProvider router={ApplicationRouter} />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  );
}

export default App;
