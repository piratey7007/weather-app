using System.Net.Http;
using System.Threading.Tasks;
using WeatherApp.Models;
using Newtonsoft.Json.Linq;

public class WeatherService
{
    private const string API_KEY = "918ff66eee27dedd2a466752c8ac53eb";
    private const string API_URL_WEATHER = "http://api.openweathermap.org/data/2.5/weather?q={0}&appid={1}&units=metric";

    public async Task<Location?> GetLocationAsync(string lat, string lon)
    {
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("User-Agent", "WeatherApp");
            var response = await client.GetAsync(string.Format("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={0}&lon={1}&addressdetails=1", lat, lon));
            if (!response.IsSuccessStatusCode) return null;

            var json = await response.Content.ReadAsStringAsync();
            JObject jObject = JObject.Parse(json);
            LocationResponse data = jObject.ToObject<LocationResponse>();
            return new Location
            {
                City = data.address.city,
                Region = data.address.state,
                Country = data.address.country,
            };
        }
    }

    public async Task<Weather?> GetWeatherAsync(string city)
    {
        using (var client = new HttpClient())
        {
            var response = await client.GetAsync(string.Format(API_URL_WEATHER, city, API_KEY));
            if (!response.IsSuccessStatusCode) return null;

            var json = await response.Content.ReadAsStringAsync();
            JObject jObject = JObject.Parse(json);
            WeatherResponse data = jObject.ToObject<WeatherResponse>()!;
            Location location = await GetLocationAsync(data.coord.lat.ToString(), data.coord.lon.ToString());
            return new Weather
            {
                City = location?.City,
                Region = location?.Region,
                Country = location?.Country,
                Temperature = data.main.temp.ToString(),
                Description = data.weather[0].description.ToString(),
            };
        }
    }

    public async Task<Forecast?> GetForecastAsync(string city)
    {
        using (var client = new HttpClient())
        {
            var response = await client.GetAsync(string.Format("http://api.openweathermap.org/data/2.5/forecast?q={0}&appid={1}&units=metric", city, API_KEY));
            if (!response.IsSuccessStatusCode) return null;

            var json = await response.Content.ReadAsStringAsync();
            JObject jObject = JObject.Parse(json);
            ForecastResponse data = jObject.ToObject<ForecastResponse>()!;
            Location location = await GetLocationAsync(data.city.coord.lat.ToString(), data.city.coord.lon.ToString());
            return new Forecast
            {
                City = location?.City,
                Region = location?.Region,
                Country = location?.Country,
                ForecastChunks = data.list.Select(chunk => new Forecast.ForecastChunk
                {
                    Day = DateTime.Parse(chunk.dt_txt).DayOfWeek.ToString(),
                    Date = chunk.dt_txt,
                    Temperature = (int)chunk.main.temp,
                    High = (int)chunk.main.temp_max,
                    Low = (int)chunk.main.temp_min,
                    Description = chunk.weather[0].description.ToString(),
                }).ToList(),

            };
        }
    }
}