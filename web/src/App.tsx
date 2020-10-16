import React from "react";
import AppRoutes from "./routes";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<h1>loading</h1>} persistor={persistor}>
        <>
          <AppRoutes />
          <ToastContainer />
        </>
      </PersistGate>
    </Provider>
  );
}

export default App;
