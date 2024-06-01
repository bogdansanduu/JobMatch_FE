import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";

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
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="colored"
              transition={Bounce}
            />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
