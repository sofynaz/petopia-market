import React from "react";
import App from "./app.tsx";
import ReactDOM from "react-dom/client";
import "./index.css";
// react-query
import { QueryProvider } from "./utils/react-query.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>
);
