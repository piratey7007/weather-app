import { useEffect, useState } from "react";
import { getWeatherData, getLocation } from "../services/weather";

export default function useWeather(loc?: {
  city: string;
  state?: string;
  country?: string;
}) {
  const [data, setData] = useState<{
    city: string;
    state: string;
    country: string;
    weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }[];
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    coord: {
      lat: number;
      lon: number;
    };
  }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (loc) {
          const data = await getWeatherData(loc);
          const location = await getLocation(data.coord.lat, data.coord.lon);
          setData({
            ...location,
            ...data,
          });
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [loc]);

  return { data, loading, error };
}
