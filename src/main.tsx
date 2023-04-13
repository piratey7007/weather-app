import "./styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  ForecastProvider,
  WeatherProvider,
  DayNightProvider,
} from "./contexts/LocalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <DayNightProvider>
        <WeatherProvider>
          <ForecastProvider>
            <App />
          </ForecastProvider>
        </WeatherProvider>
      </DayNightProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
