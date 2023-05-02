using Microsoft.AspNetCore.Mvc;

namespace WeatherApp.Controllers;

public class NavController : Controller
{
    private readonly WeatherService _weatherService;

    public NavController(WeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    // [HttpPost]
    // public async Task<IActionResult> GetWeather(string query)
    // {
    //     return PartialView("_Weather", await _weatherService.GetLocationWeatherAsync(null, query));
    // }

    // [HttpPost]
    // public async Task<IActionResult> GetForecast(string query)
    // {
    //     return PartialView("_Forecast", (await _weatherService.GetLocationWeatherAsync(null, query))?.Forecast);
    // }

}
