import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/styles.css";
import "./styles/layout.css"; 
import { ToastContainer } from 'react-toastify';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={2500}/>
  </React.StrictMode>
);
