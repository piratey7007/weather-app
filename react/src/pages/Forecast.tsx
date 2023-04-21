import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForecast } from "../contexts/LocalContext";

export default function Forecast() {
  const { city, state, country } = useParams();
  const [location, setLocation] = useState(
    city ? { city, state, country } : undefined,
  );
  useEffect(() => {
    if (city) {
      setLocation({ city, state, country });
    }
  }, [city, state, country]);
  const { data, loading, error } = useForecast(location);

  if (location)
    return (
      <div>
        {error && <p>{error.message}</p>}
        <h1>
          {data?.city}
          {data?.state ? `, ${data?.state}` : ""}
          {data?.country ? `, ${data?.country}` : ""}
        </h1>
        {loading ? <p>Loading...</p> : <p>data here?</p>}
      </div>
    );
  return <div>Weather</div>;
}
