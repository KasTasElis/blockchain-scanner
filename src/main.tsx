import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { SearchHistoryProvider } from "./utils";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SearchHistoryProvider>
      <App />
    </SearchHistoryProvider>
  </React.StrictMode>
);
