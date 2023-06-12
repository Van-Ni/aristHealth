using System.Text.Json.Serialization;

namespace AristBaseLib.DTO
{
    public class SyncSignedResponse
    {
        [JsonPropertyName("result")]
        public CertificateSignedSyncDto result { get; set; }

        [JsonPropertyName("targetUrl")]
        public object targetUrl { get; set; }

        [JsonPropertyName("success")]
        public bool success { get; set; }

        [JsonPropertyName("error")]
        public object error { get; set; }

        [JsonPropertyName("unAuthorizedRequest")]
        public bool unAuthorizedRequest { get; set; }

        [JsonPropertyName("__abp")]
        public bool __abp { get; set; }
    }
}
