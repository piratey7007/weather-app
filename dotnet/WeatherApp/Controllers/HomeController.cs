using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using WeatherApp.Models;

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
    public async Task<IActionResult> GetWeather(string city)
    {
        var weather = await _weatherService.GetWeatherAsync(city);
        return PartialView("_Weather", weather);
    }
}
