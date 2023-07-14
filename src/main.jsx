import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import  "./styles/main.scss"
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
   
    <BrowserRouter>
      <App />
    </BrowserRouter>
   
);
