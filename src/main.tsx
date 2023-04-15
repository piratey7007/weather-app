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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <BreakpointProvider>
        <DayNightProvider>
          <WeatherProvider>
            <ForecastProvider>
              <App />
            </ForecastProvider>
          </WeatherProvider>
        </DayNightProvider>
      </BreakpointProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
