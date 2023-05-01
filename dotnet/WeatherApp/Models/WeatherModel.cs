using Newtonsoft.Json;

namespace WeatherApp.Models;

public class WeatherLocations
{
    public WeatherLocations(Dictionary<LocationBasic, Weather> locations)
    {
        this.Locations = locations;
    }
    public Dictionary<LocationBasic, Weather> Locations { get; set; }
}

public class Weather
{
    public Location? LocationData { get; set; }
    public string? Icon { get; set; }
    public string? Description { get; set; }
    public double? Temperature { get; set; }
    public double? FeelsLike { get; set; }
    public double? High { get; set; }
    public double? Low { get; set; }
    public double? Humidity { get; set; }
    public double? Pressure { get; set; }
    public double? WindSpeed { get; set; }
    public double? WindDirection { get; set; }
    public double? Cloudiness { get; set; }
    public double? Sunrise { get; set; }
    public double? Sunset { get; set; }
    public double? Timezone { get; set; }
    public double? ID { get; set; }
    public string? Name { get; set; }
    public double? Cod { get; set; }
    public double? Dt { get; set; }
    public double? SeaLevel { get; set; }
    public double? GrndLevel { get; set; }
    public double? WindGust { get; set; }
    public double? Rain1h { get; set; }
    public Forecast Forecast { get; set; }
}

public class WeatherResponse
{
    public Coord? coord { get; set; }
    public List<Weather>? weather { get; set; }
    public Main? main { get; set; }
    public Wind? wind { get; set; }
    public Rain? rain { get; set; }
    public Clouds? clouds { get; set; }
    public Sys? sys { get; set; }
    public int dt { get; set; }
    public int timezone { get; set; }
    public int id { get; set; }
    public string? name { get; set; }
    public int cod { get; set; }

    public record Coord
    {
        public double lon { get; set; }
        public double lat { get; set; }
    }

    public record Weather
    {
        public int id { get; set; }
        public string? main { get; set; }
        public string? description { get; set; }
        public string? icon { get; set; }
    }

    public record Main
    {
        public double temp { get; set; }
        [JsonProperty("feels_like")]
        public double feelsLike { get; set; }
        [JsonProperty("temp_min")]
        public double tempMin { get; set; }
        [JsonProperty("temp_max")]
        public double tempMax { get; set; }
        public int pressure { get; set; }
        public int humidity { get; set; }
        [JsonProperty("sea_level")]
        public int seaLevel { get; set; }
        [JsonProperty("grnd_level")]
        public int grndLevel { get; set; }
    }

    public record Wind
    {
        public double speed { get; set; }
        public int deg { get; set; }
        public double gust { get; set; }
    }

    public record Rain
    {
        [JsonProperty("1h")]
        public double _1h { get; set; }
    }

    public record Clouds
    {
        public int all { get; set; }
    }

    public record Sys
    {
        public int type { get; set; }
        public int id { get; set; }
        public string? country { get; set; }
        public int sunrise { get; set; }
        public int sunset { get; set; }
    }
}