using System.Text.Json.Serialization;

namespace AristBase.BaseEntity.XML
{
    public class SyncResponse
    {
        [JsonPropertyName("MSG_TEXT")]
        public string MSG_TEXT { get; set; }

        [JsonPropertyName("MSG_STATE")]
        public string MSG_STATE { get; set; }

        [JsonPropertyName("IDBENHVIEN")]
        public string IDBENHVIEN { get; set; }

        [JsonPropertyName("SO")]
        public string SO { get; set; }

        [JsonPropertyName("BENHVIEN")]
        public string BENHVIEN { get; set; }

        [JsonPropertyName("UUID")]
        public string UUID { get; set; }
    }
}
