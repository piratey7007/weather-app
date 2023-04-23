using Newtonsoft.Json;

public class Location
{
    public string? City { get; set; }
    public string? Region { get; set; }
    public string? Country { get; set; }
}

public class LocationResponse
{
    [JsonProperty("place_id")]
    public string placeId { get; set; }
    public string licence { get; set; }
    [JsonProperty("osm_type")]
    public string osmType { get; set; }
    [JsonProperty("osm_id")]
    public string osmId { get; set; }
    [JsonProperty("boundingbox")]
    public List<string> boundingBox { get; set; }
    public string lat { get; set; }
    public string lon { get; set; }
    [JsonProperty("display_name")]
    public string displayName { get; set; }
    [JsonProperty("class")]
    public string className { get; set; }
    public string type { get; set; }
    public double importance { get; set; }
    public string icon { get; set; }
    public record Address
    {
        public string city { get; set; }
        [JsonProperty("state_district")]
        public string stateDistrict { get; set; }
        public string state { get; set; }
        public string ISO3166_2_lvl4 { get; set; }
        public string postcode { get; set; }
        public string country { get; set; }
        [JsonProperty("country_code")]
        public string countryCode { get; set; }
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
    [JsonProperty("extratags")]
    public ExtraTags extraTags { get; set; }
}