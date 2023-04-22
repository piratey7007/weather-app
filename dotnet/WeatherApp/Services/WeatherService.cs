using System.Net.Http;
using System.Threading.Tasks;
using WeatherApp.Models;
using Newtonsoft.Json.Linq;

public class WeatherService
{
    private const string API_KEY = "918ff66eee27dedd2a466752c8ac53eb";
    private const string API_URL = "http://api.openweathermap.org/data/2.5/weather?q={0}&appid={1}&units=metric";

    public async Task<Location?> GetLocationAsync(string lat, string lon)
    {
        using (var client = new HttpClient())
        {
            Console.WriteLine(string.Format("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={0}&lon={1}&addressdetails=1", lat, lon));
            client.DefaultRequestHeaders.Add("User-Agent", "WeatherApp");
            var response = await client.GetAsync(string.Format("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={0}&lon={1}&addressdetails=1", lat, lon));
            if (!response.IsSuccessStatusCode) return null;

            var json = await response.Content.ReadAsStringAsync();
            var data = JObject.Parse(json);
            return new Location
            {
                City = data["address"]["city"].ToString(),
                Region = data["address"]["state"].ToString(),
                Country = data["address"]["country"].ToString(),
            };
        }
    }

    public async Task<Weather?> GetWeatherAsync(string city)
    {
        using (var client = new HttpClient())
        {
            var response = await client.GetAsync(string.Format(API_URL, city, API_KEY));
            if (!response.IsSuccessStatusCode) return null;

            var json = await response.Content.ReadAsStringAsync();
            var data = JObject.Parse(json);
            var coord = data["coord"];
            var location = await GetLocationAsync(coord["lat"].ToString(), coord["lon"].ToString());
            Console.WriteLine(location);
            return new Weather
            {
                City = location?.City,
                Region = location?.Region,
                Country = location?.Country,
                Temperature = data["main"]["temp"].ToString(),
                Description = data["weather"][0]["description"].ToString(),
            };
        }
    }

}