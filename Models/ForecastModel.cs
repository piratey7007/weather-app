using Newtonsoft.Json;

namespace WeatherApp.Models;

public class Forecast
{
    public Location? LocationData { get; set; }
    public List<ForecastChunk>? ForecastChunks { get; set; }
    public record ForecastChunk
    {
        public string? Day { get; set; }
        public string? Date { get; set; }
        public string? Description { get; set; }
        public double? Temperature { get; set; }
        public double Low { get; set; }
        public double High { get; set; }
        public double Humidity { get; set; }
        public double WindSpeed { get; set; }
        public double WindDirection { get; set; }
        public double WindGust { get; set; }
        public double Cloudiness { get; set; }
        public double Sunrise { get; set; }
        public double Sunset { get; set; }
        public string? Icon { get; set; }
        public double Timezone { get; set; }
        public double Dt { get; set; }
        public double ID { get; set; }
        public string? Name { get; set; }
        public double Cod { get; set; }
        public double SeaLevel { get; set; }
        public double GrndLevel { get; set; }
        public double Pressure { get; set; }
        public double FeelsLike { get; set; }
        public double Rain3h { get; set; }
    }
    public double GetLow(List<ForecastChunk> forecastChunks, string day)
    {
        double lowest = 100000000;
        for (int i = 0; i < forecastChunks.Count; i++)
        {
            ForecastChunk forecastChunk = forecastChunks[i];
            if (i == 0) lowest = forecastChunk.Low;
            else if ((forecastChunk.Day == day && forecastChunk.Low < lowest)) lowest = forecastChunk.Low;
        }
        return lowest;
    }

    public double GetHigh(List<ForecastChunk> forecastChunks, string day)
    {
        double highest = 0;
        for (int i = 0; i < forecastChunks.Count; i++)
        {
            ForecastChunk forecastChunk = forecastChunks[i];
            if (i == 0) highest = forecastChunk.High;
            else if ((forecastChunk.Day == day && forecastChunk.High > highest)) highest = forecastChunk.High;
        }
        return highest;
    }

    public string GetIconUrl(List<ForecastChunk> forecastChunks, string day)
    {
        bool overcast = false;
        bool few = false;
        bool scattered = false;
        bool rain = false;
        bool snow = false;
        bool thunderstorm = false;
        for (int i = 0; i < forecastChunks.Count; i++)
        {
            ForecastChunk forecastChunk = forecastChunks[i];
            if (forecastChunk.Day == day)
            {
                string description = forecastChunk.Description!;
                if (description.Contains("overcast")) overcast = true;
                if (description.Contains("few clouds")) few = true;
                if (description.Contains("scattered clouds")) scattered = true;
                if (description.Contains("rain") || description.Contains("drizzle")) rain = true;
                if (description.Contains("snow")) snow = true;
                if (description.Contains("thunderstorm")) thunderstorm = true;
            }
        }
        string icon = "";
        if (overcast) icon = "overcast";
        else if (few) icon = "few";
        else if (scattered) icon = "scattered";
        var chunkTime = DateTime.Parse(forecastChunks[0].Date!).TimeOfDay;
        if (!overcast && !scattered)
        {
            if (chunkTime.Hours >= 18 || chunkTime.Hours <= 6) icon += "_night";
            else icon += "_day";
        }
        if (thunderstorm) icon += "_thunderstorm";
        else if (snow) icon += "_snow";
        else if (rain) icon += "_rain";
        if (icon.StartsWith("_")) icon = icon.Substring(1);
        return icon + ".png";
    }
}

public class ForecastResponse
{
    public string? cod { get; set; }
    public int message { get; set; }
    public int cnt { get; set; }
    public record List
    {
        public int dt { get; set; }
        public Main? main { get; set; }
        public List<Weather>? weather { get; set; }
        public Clouds? clouds { get; set; }
        public Wind? wind { get; set; }
        public Rain? rain { get; set; }
        public Sys? sys { get; set; }
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
            [JsonProperty("sea_level")]
            public int seaLevel { get; set; }
            [JsonProperty("grnd_level")]
            public int grndLevel { get; set; }
            public int humidity { get; set; }
            [JsonProperty("temp_kf")]
            public double tempKf { get; set; }
        }
        public record Weather
        {
            public int id { get; set; }
            public string? main { get; set; }
            public string? description { get; set; }
            public string? icon { get; set; }
        }
        public record Clouds
        {
            public int all { get; set; }
        }
        public record Wind
        {
            public double speed { get; set; }
            public int deg { get; set; }
            public double gust { get; set; }
        }
        public int visibility { get; set; }
        public double pop { get; set; }
        public record Rain
        {
            [JsonProperty("3h")]
            public double _3h { get; set; }
        }
        public record Sys
        {
            public string? pod { get; set; }
        }
        [JsonProperty("dt_txt")]
        public string? dtTxt { get; set; }
    }
    public record City
    {
        public int id { get; set; }
        public string? name { get; set; }
        public Coord? coord { get; set; }
        public record Coord
        {
            public double lat { get; set; }
            public double lon { get; set; }
        }
        public string? country { get; set; }
        public int population { get; set; }
        public int timezone { get; set; }
        public int sunrise { get; set; }
        public int sunset { get; set; }
    }
    public List[]? list { get; set; }
    public City? city { get; set; }
}