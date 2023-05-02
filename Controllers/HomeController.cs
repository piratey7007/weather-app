using Microsoft.AspNetCore.Mvc;

namespace WeatherApp.Controllers;

public class HomeController : Controller
{
    private readonly WeatherService _weatherService;

    public HomeController(WeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> GetWeather(string query)
    {
        var weather = await _weatherService.GetLocationWeatherAsync(null, query);
        return PartialView("_Weather", weather);
    }

    [HttpPost]
    public async Task<IActionResult> GetForecast(string query)
    {
        var forecast = (await _weatherService.GetLocationWeatherAsync(null, query))?.Forecast;
        return PartialView("_Forecast", forecast);
    }

}
