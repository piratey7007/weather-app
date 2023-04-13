// Description: This file contains the functions that fetch the weather data from the OpenWeatherMap API

import {
  Location,
  NominatimResponse,
  OpenWeatherResponse,
} from "../types/api-types";

export async function getWeatherData({ city, state, country }: Location) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}${
      state ? "," + state : ""
    }${country ? "," + country : ""}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`,
  );
  if (res.ok && res.json) {
    const json: OpenWeatherResponse = await res.json();
    if (!json) return;
    return {
      weather: json.weather,
      main: json.main,
      wind: json.wind,
      coord: json.coord,
    };
  }
}

export async function getForecastData({
  coord,
  location,
}: {
  coord?: { lat: number; lon: number };
  location?: Location;
}) {
  async function get(lat = coord?.lat, lon = coord?.lon) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${
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
  if (coord) return get();
  if (!location) return;
  const coords = await getLocation(location);
  if (!coords) return;
  return get(coords.lat, coords.lon);
}

export async function getLocation({
  city,
  coords,
}: {
  city?: string;
  coords?: { lat: number; lon: number };
}) {
  const res =
    coords?.lat && coords?.lon
      ? await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lon}&addressdetails=1`,
        )
      : city
      ? await fetch(
          `https://nominatim.openstreetmap.org/search?q=${city}&format=jsonv2&addressdetails=1`,
        )
      : "";
  if (!res || !res.ok || !res.json) return;
  const json: NominatimResponse = await res.json();
  return {
    city: json.address.city,
    state: json.address.state,
    country: json.address.country,
    lat: Number(json.lat),
    lon: Number(json.lon),
  };
}
