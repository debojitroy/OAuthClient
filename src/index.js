import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "./index.css";
import { getHistory } from './common/history';
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router history={getHistory()}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
