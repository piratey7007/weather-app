using WeatherApp.Models;
using Newtonsoft.Json.Linq;

public class WeatherService
{
    private static WeatherLocations _data = new WeatherLocations(new Dictionary<LocationBasic, Weather>());
    public record WeatherOptions
    {
        public bool force { get; set; }
    }
    public record ForecastOptions
    {
        public bool force { get; set; }
    }
    private const string API_KEY = "918ff66eee27dedd2a466752c8ac53eb";

    public async Task<Location?> GetLocationAsync(string? query)
    {
        using (var client = new HttpClient())
        {
            Console.WriteLine(string.Format("https://nominatim.openstreetmap.org/?q={0}&limit=1&addressdetails=1&format=jsonv2", query));
            client.DefaultRequestHeaders.Add("User-Agent", "WeatherApp");
            var res = await client.GetAsync(string.Format("https://nominatim.openstreetmap.org/?q={0}&limit=1&addressdetails=1&format=jsonv2", query));
            if (!res.IsSuccessStatusCode) return null;
            var json = await res.Content.ReadAsStringAsync();
            JArray jArray = JArray.Parse(json);
            LocationResponse data = jArray.ToObject<LocationResponse[]>()![0];
            return new Location
            {
                City = data.address!.city,
                Region = data.address.state,
                Country = data.address.country,
                Latitude = double.Parse(data.lat!),
                Longitude = double.Parse(data.lon!)
            };
        }
    }

    public async Task<Weather?> GetLocationWeatherAsync(Location? input, string? query, WeatherOptions? options = null)
    {
        using (var client = new HttpClient())
        {
            LocationBasic key = new LocationBasic
            {
                City = input?.City,
                Region = input?.Region,
                Country = input?.Country
            };
            if (options?.force == true) _data.Locations.Remove(key);
            if (_data.Locations.ContainsKey(key)) return _data.Locations[key];

            Location? location;
            if (
                input != null &&
                input.City != null &&
                input.Region != null &&
                input.Country != null &&
                input.Latitude != null &&
                input.Longitude != null
            ) location = input;
            else location = await GetLocationAsync(query);
            if (location == null) return null;
            key = new LocationBasic
            {
                City = location.City,
                Region = location.Region,
                Country = location.Country
            };

            WeatherResponse weatherData;
            {
                HttpResponseMessage res = await client.GetAsync(string.Format("http://api.openweathermap.org/data/2.5/weather?lat={0}&lon={1}&appid={2}&units=metric", location.Latitude, location.Longitude, API_KEY));
                if (!res.IsSuccessStatusCode) return null;
                string json = await res.Content.ReadAsStringAsync();
                JObject jObject = JObject.Parse(json);
                weatherData = jObject.ToObject<WeatherResponse>()!;
            }

            ForecastResponse forecastData;
            {
                HttpResponseMessage res = await client.GetAsync(string.Format("http://api.openweathermap.org/data/2.5/forecast?lat={0}&lon={1}&appid={2}&units=metric", location.Latitude, location.Longitude, API_KEY));
                if (!res.IsSuccessStatusCode) return null;
                string json = await res.Content.ReadAsStringAsync();
                JObject jObject = JObject.Parse(json);
                forecastData = jObject.ToObject<ForecastResponse>()!;
            }

            Forecast forecast = new Forecast
            {
                LocationData = location,
                ForecastChunks = forecastData.list?.Select(x =>
                    new Forecast.ForecastChunk
                    {
                        Day = DateTime.Parse(x.dtTxt!).DayOfWeek.ToString(),
                        Temperature = (int)x.main!.temp,
                        High = (int)x.main.tempMax,
                        Low = (int)x.main.tempMin,
                        Description = x.weather![0].description!.ToString(),
                        Humidity = x.main.humidity,
                        WindSpeed = x.wind!.speed,
                        WindDirection = x.wind.deg,
                        WindGust = x.wind.gust,
                        Cloudiness = x.clouds!.all,
                        Sunrise = forecastData.city!.sunrise,
                        Sunset = forecastData.city.sunset,
                        Timezone = weatherData.timezone,
                        Dt = x.dt,
                        ID = weatherData.id,
                        Name = weatherData.name,
                        Cod = weatherData.cod,
                        SeaLevel = x.main.seaLevel,
                        GrndLevel = x.main.grndLevel,
                        Pressure = x.main.pressure,
                        FeelsLike = x.main.feelsLike,
                        // Rain3h = x.rain._3h,
                    }
                ).ToList()
            };

            Weather weather = new Weather
            {
                LocationData = location,
                Temperature = (int)weatherData.main!.temp,
                High = (int)weatherData.main.tempMax,
                Low = (int)weatherData.main.tempMin,
                Description = weatherData.weather![0].description!.ToString(),
                Humidity = weatherData.main.humidity,
                WindSpeed = weatherData.wind!.speed,
                WindDirection = weatherData.wind.deg,
                WindGust = weatherData.wind.gust,
                Cloudiness = weatherData.clouds!.all,
                Sunrise = weatherData.sys!.sunrise,
                Sunset = weatherData.sys.sunset,
                Icon = weatherData.weather[0].icon!.ToString(),
                Timezone = weatherData.timezone,
                Dt = weatherData.dt,
                ID = weatherData.id,
                Name = weatherData.name,
                Cod = weatherData.cod,
                SeaLevel = weatherData.main.seaLevel,
                GrndLevel = weatherData.main.grndLevel,
                Pressure = weatherData.main.pressure,
                FeelsLike = weatherData.main.feelsLike,
                Rain1h = weatherData.rain?._1h,
                Forecast = forecast
            };

            _data.Locations.Add(key, weather);

            return weather;
        }
    }
}