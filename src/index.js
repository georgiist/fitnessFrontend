import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./components/authorization";
import App from "./App";

ReactDOM.render(
  <AuthContextProvider>

  <BrowserRouter>
  <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
