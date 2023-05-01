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
    public async Task<IActionResult> GetWeather(Location location)
    {
        return PartialView("_Weather", await _weatherService.GetLocationWeatherAsync(location));
    }

    [HttpPost]
    public async Task<IActionResult> GetForecast(Location location)
    {
        return PartialView("_Forecast", (await _weatherService.GetLocationWeatherAsync(location))?.Forecast);
    }

}
