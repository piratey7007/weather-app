// Description: This file contains the functions that fetch the weather data from the OpenWeatherMap API

import { NominatimResponse, OpenWeatherResponse } from "../types/api-types";

export async function getWeatherData({
  city,
  state,
  country,
}: {
  city: string;
  state?: string;
  country?: string;
}) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}${
      state ? "," + state : ""
    }${country ? "," + country : ""}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`,
  );
  const json: OpenWeatherResponse = await res.json();
  return {
    weather: json.weather,
    main: json.main,
    wind: json.wind,
    coord: json.coord,
  };
}

export async function getWeatherForecast(location: string) {
  //   return fetch().then((response) => response.json());
}

export async function getLocation(lat: number, lon: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
  );
  const json: NominatimResponse = await res.json();

  return {
    city: json.address.city,
    state: json.address.state,
    country: json.address.country,
  };
}
