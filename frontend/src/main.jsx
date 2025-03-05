import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.min.css"; // Minified version
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
