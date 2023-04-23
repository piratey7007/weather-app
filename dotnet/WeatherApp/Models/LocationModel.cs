using Newtonsoft.Json;

public class Location
{
    public string? City { get; set; }
    public string? Region { get; set; }
    public string? Country { get; set; }
}

public class LocationResponse
{
    public string place_id { get; set; }
    public string licence { get; set; }
    public string osm_type { get; set; }
    public string osm_id { get; set; }
    public List<string> boundingbox { get; set; }
    public string lat { get; set; }
    public string lon { get; set; }
    public string display_name { get; set; }
    [JsonProperty("class")]
    public string className { get; set; }
    public string type { get; set; }
    public double importance { get; set; }
    public string icon { get; set; }
    public record Address
    {
        public string city { get; set; }
        public string state_district { get; set; }
        public string state { get; set; }
        public string ISO3166_2_lvl4 { get; set; }
        public string postcode { get; set; }
        public string country { get; set; }
        public string country_code { get; set; }
    }
    public Address address { get; set; }
    public record ExtraTags
    {
        public string capital { get; set; }
        public string website { get; set; }
        public string wikidata { get; set; }
        public string wikipedia { get; set; }
        public string population { get; set; }
    }
    public ExtraTags extratags { get; set; }
}