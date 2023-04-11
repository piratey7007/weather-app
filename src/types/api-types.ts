export type OpenWeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type OpenForecastResponse = {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
};

export type NominatimResponse = {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  place_rank: string;
  category: string;
  type: string;
  importance: string;
  addresstype: string;
  display_name: string;
  name: string;
  address: {
    road: string;
    city: string;
    state_district: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
};

export type WeatherData = {
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
};

export type Location = {
  city: string;
  state: string;
  country: string;
};
