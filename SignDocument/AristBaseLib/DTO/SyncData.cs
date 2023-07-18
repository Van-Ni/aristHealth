using System.Text.Json.Serialization;

namespace AristBaseLib.DTO
{
    public class SyncData
    {
        [JsonPropertyName("syncStatus")]
        public int syncStatus { get; set; }

        [JsonPropertyName("metaData")]
        public MetaData metaData { get; set; }

        [JsonPropertyName("certificateId")]
        public string certificateId { get; set; }

        [JsonPropertyName("xmlEncrypted")]
        public object xmlEncrypted { get; set; }

        [JsonPropertyName("xmlUnSign")]
        public string xmlUnSign { get; set; }

        [JsonPropertyName("certificate")]
        public object certificate { get; set; }

        [JsonPropertyName("id")]
        public int id { get; set; }
    }
}
