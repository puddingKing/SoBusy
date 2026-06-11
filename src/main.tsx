import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { setupDevMock } from "./dev-mock";
import "./index.css";

if (import.meta.env.DEV) setupDevMock();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
