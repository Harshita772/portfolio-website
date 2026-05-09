// src/main.jsx  — Vite entry point
import React from "react";
import ReactDOM from "react-dom/client";
import "./portfolio.css";
import SpacePortfolio from "./SpacePortfolio";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SpacePortfolio />
  </React.StrictMode>
);
