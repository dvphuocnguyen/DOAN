import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { DataProvider } from "./context/GlobalState.jsx";
import { DaysProvider } from "./components/common/DayPicker/DayContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider>
      <AuthProvider>
        <DaysProvider>
          <App />
        </DaysProvider>
      </AuthProvider>
    </DataProvider>
  </BrowserRouter>
);
