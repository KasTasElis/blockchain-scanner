import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  NotificationsContextProvider,
  RatesContextProvider,
  SearchContextProvider,
  SearchHistoryProvider,
} from "./hooks";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NotificationsContextProvider>
      <SearchHistoryProvider>
        <SearchContextProvider>
          <RatesContextProvider>
            <App />
          </RatesContextProvider>
        </SearchContextProvider>
      </SearchHistoryProvider>
    </NotificationsContextProvider>
  </React.StrictMode>
);
