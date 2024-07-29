import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./app.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
);

// Add the PersistGate if you need redux-persist for your local storage if not then don't put it in the main
