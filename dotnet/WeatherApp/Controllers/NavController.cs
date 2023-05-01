using Microsoft.AspNetCore.Mvc;

namespace WeatherApp.Controllers;

public class NavController : Controller
{
    private readonly WeatherService _weatherService;

    public NavController(WeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    [HttpPost]
    public async Task<IActionResult> GetWeather(string city)
    {
        Location location = new Location
        {
            City = city,
            Region = null,
            Country = null,
            Latitude = null,
            Longitude = null
        };
        return PartialView("_Weather", await _weatherService.GetLocationWeatherAsync(location));
    }

    [HttpPost]
    public async Task<IActionResult> GetForecast(string city)
    {
        Location location = new Location
        {
            City = city,
            Region = null,
            Country = null,
            Latitude = null,
            Longitude = null
        };
        return PartialView("_Forecast", (await _weatherService.GetLocationWeatherAsync(location))?.Forecast);
    }

}
