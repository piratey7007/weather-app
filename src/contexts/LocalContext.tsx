import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Location, WeatherData } from "../types/api-types";
import {
  getForecastData,
  getLocation,
  getWeatherData,
} from "../services/weather";

type WeatherContextT = {
  data: WeatherData | undefined;
  loading: boolean;
  error: any;
  setInput: (location: Location) => void;
};

const WeatherContext = createContext({} as WeatherContextT);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState<Location>();
  const [data, setData] = useState<WeatherData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("heyheyhyey");
    console.log(input);
    (async () => {
      try {
        if (!input) return;
        setLoading(true);
        const data = await getWeatherData(input);
        const location = await getLocation({
          coords: { lat: data.coord.lat, lon: data.coord.lon },
        });
        setData({
          ...location,
          ...data,
          temp: (symbol: "k" | "c" | "f") => {
            return (
              Math.round(
                (data.main.temp - (symbol !== "k" ? 273.15 : 0)) *
                  (symbol === "f" ? 9 / 5 : 1) +
                  (symbol === "f" ? 32 : 0),
              ) +
              "°" +
              symbol.toUpperCase()
            );
          },
        } as WeatherData);
        console.log("hey");
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [input]);

  return (
    <WeatherContext.Provider value={{ data, loading, error, setInput }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather(location?: Location) {
  const context = useContext(WeatherContext);
  useEffect(() => {
    if (location) context.setInput(location);
  }, [location]);
  return context;
}

type ForecastContextT = {
  data: ForecastData | undefined;
  loading: boolean;
  error: any;
  setInput: (location: Location) => void;
};

const ForecastContext = createContext({} as ForecastContextT);

export function ForecastProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState<Location>();
  const [data, setData] = useState<WeatherData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (!input) return;
        setLoading(true);
        const data = await getForecastData({
          location: input,
        });
        const location = await getLocation({
          coords: data
            ? {
                lat: data.coord.lat,
                lon: data.coord.lon,
              }
            : undefined,
          city: input?.city ? input.city : undefined,
        });
        setData({
          ...location,
          ...data,
          temp: (symbol: "k" | "c" | "f") => {
            if (!data) return;
            return (
              Math.round(
                (data.main.temp - (symbol !== "k" ? 273.15 : 0)) *
                  (symbol === "f" ? 9 / 5 : 1) +
                  (symbol === "f" ? 32 : 0),
              ) +
              "°" +
              symbol.toUpperCase()
            );
          },
        } as WeatherData);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [input]);

  return (
    <ForecastContext.Provider value={{ data, loading, error, setInput }}>
      {children}
    </ForecastContext.Provider>
  );
}

export function useForecast(location?: Location) {
  const context = useContext(ForecastContext);
  useEffect(() => {
    if (location) context.setInput(location);
  }, [location]);
  return context;
}
