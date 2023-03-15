import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import AppProviders from "./app/AppProviders";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AppProviders>
    <App />
    <Toaster />
  </AppProviders>
);
