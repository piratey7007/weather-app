import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWeather } from "../contexts/LocalContext";
import Icon from "../assets/Icon";

export default function Weather() {
  const [params] = useSearchParams();
  const city = params.get("city") || undefined,
    state = params.get("state") || undefined,
    country = params.get("country") || undefined;

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
        {error && <p>{error.message}</p>}
        <h1>
          {data?.city}
          {data?.state ? `, ${data?.state}` : ""}
          {data?.country ? `, ${data?.country}` : ""}
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>
            {data?.temp("f")}, {data?.weather[0].description}
          </p>
        )}
      </div>
    );
  return <></>;
}
