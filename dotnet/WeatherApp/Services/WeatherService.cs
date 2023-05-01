using WeatherApp.Models;
using Newtonsoft.Json.Linq;

public class WeatherService
{
    private static WeatherLocations _locations = new WeatherLocations(new Dictionary<LocationBasic, Weather>());
    public record WeatherOptions
    {
        public bool force { get; set; }
    }
    public record ForecastOptions
    {
        public bool force { get; set; }
    }
    private const string API_KEY = "918ff66eee27dedd2a466752c8ac53eb";
    public async Task<Location?> GetLocationAsync(string lat, string lon)
    {
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("User-Agent", "WeatherApp");
            var response = await client.GetAsync(string.Format("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={0}&lon={1}&addressdetails=1", lat, lon));
            if (!response.IsSuccessStatusCode) return null;

            var json = await response.Content.ReadAsStringAsync();
            JObject jObject = JObject.Parse(json);
            LocationResponse data = jObject.ToObject<LocationResponse>()!;
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

    public async Task<Weather?> GetLocationWeatherAsync(Location input, WeatherOptions? options = null)
    {
        using (var client = new HttpClient())
        {
            LocationBasic key = new LocationBasic
            {
                City = input.City,
                Region = input.Region,
                Country = input.Country
            };
            if (options?.force == true) _locations.Locations.Remove(key);
            if (_locations.Locations.ContainsKey(key)) return _locations.Locations[key];

            (string City, string Region, string Country) = (input.City!, input.Region!, input.Country!);
            Location location;

            WeatherResponse weatherData;
            {
                HttpResponseMessage res = await client.GetAsync(string.Format("http://api.openweathermap.org/data/2.5/weather?q={0}{1}{2}&appid={3}&units=metric", City, Region != null ? "," + Region : "", Country != null ? "," + Country : "", API_KEY));
                if (!res.IsSuccessStatusCode) return null;
                string json = await res.Content.ReadAsStringAsync();
                JObject jObject = JObject.Parse(json);
                weatherData = jObject.ToObject<WeatherResponse>()!;
            }

            if (Region == null || Country == null) location = (await GetLocationAsync(weatherData.coord!.lat.ToString(), weatherData.coord.lon.ToString()))!;
            else location = new Location
            {
                City = City,
                Region = Region,
                Country = Country,
                Latitude = weatherData.coord!.lat,
                Longitude = weatherData.coord.lon
            };
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
                ForecastChunks = forecastData.list!.Select(x => new Forecast.ForecastChunk
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
                    Icon = x.weather[0].icon!.ToString(),
                    Timezone = weatherData.timezone,
                    Dt = x.dt,
                    ID = weatherData.id,
                    Name = weatherData.name,
                    Cod = weatherData.cod,
                    SeaLevel = x.main.seaLevel,
                    GrndLevel = x.main.grndLevel,
                    Pressure = x.main.pressure,
                    FeelsLike = x.main.feelsLike,
                    Rain3h = x.rain!._3h,
                }).ToList()
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
            return weather;
        }
    }
}