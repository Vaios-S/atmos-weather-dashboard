import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import WeatherProvider from "./context/WeatherProvider.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WeatherProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </WeatherProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
