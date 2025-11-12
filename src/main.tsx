import React from "react";
import { WishProvider } from "./Context/WishContext";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WishProvider>
      <App />
    </WishProvider>
  </React.StrictMode>
);
