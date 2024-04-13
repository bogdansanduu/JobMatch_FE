import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { store, persistor } from "./store/store";
import ApplicationRouter from "./router/ApplicationRouter";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <React.StrictMode>
            <RouterProvider router={ApplicationRouter} />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
