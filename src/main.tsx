import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  RatesContextProvider,
  SearchContextProvider,
  SearchHistoryProvider,
} from "./utils";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SearchHistoryProvider>
      <SearchContextProvider>
        <RatesContextProvider>
          <App />
        </RatesContextProvider>
      </SearchContextProvider>
    </SearchHistoryProvider>
  </React.StrictMode>
);
