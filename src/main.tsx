import "./styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ForecastProvider, WeatherProvider } from "./contexts/LocalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <WeatherProvider>
        <ForecastProvider>
          <App />
        </ForecastProvider>
      </WeatherProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
