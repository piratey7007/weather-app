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
import { BreakpointProvider } from "./contexts/BreakpointContext";
import { SettingsProvider } from "./contexts/SettingsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <BreakpointProvider>
          <DayNightProvider>
            <WeatherProvider>
              <ForecastProvider>
                <App />
              </ForecastProvider>
            </WeatherProvider>
          </DayNightProvider>
        </BreakpointProvider>
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
