using System.Text.Json.Serialization;

namespace AristBaseLib.DTO
{
    public class SyncRequestBody : CertificateDataSync
    {
        [JsonPropertyName("SIGNDATA")]
        public string SIGNDATA { get; set; }
    }
}
