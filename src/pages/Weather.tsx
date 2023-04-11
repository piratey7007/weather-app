import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useWeather from "../hooks/useWeather";

export default function Weather() {
  const { city, state, country } = useParams();
  const [location, setLocation] = useState(
    city ? { city, state, country } : undefined,
  );
  useEffect(() => {
    if (city) {
      setLocation({ city, state, country });
    }
  }, [city, state, country]);
  const { data, loading, error } = useWeather(location);

  if (location)
    return (
      <div>
        <h1>
          {data?.city}
          {data?.state ? `, ${data?.state}` : ""}
          {data?.country ? `, ${data?.country}` : ""}
        </h1>
        <p>
          {data?.main.temp}°F, {data?.weather[0].description}
        </p>
      </div>
    );
  return <div>Weather</div>;
}
