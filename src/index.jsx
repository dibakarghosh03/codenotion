import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react"; 
import { Provider } from "react-redux";
import persistedReducer from "./reducer";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
