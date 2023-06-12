using AristBaseLib.DTO;
using System.Text.Json.Serialization;

namespace AristBaseLib.DTO
{
    public class UpdateSyncRequest
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("xmlEncrypted")]
        public string XmlEncrypted { get; set; }
    }
    public enum SyncStatus
    {
        init = 0,
        done = 1,
        failed = 2,
        readyToSync = 4,
        cancelled = 3,
    }
    public class CertificateSignedSyncDto
    {
        public int Id { get; set; }
        public SyncStatus SyncStatus { get; set; }
        public CertificateDataSync MetaData { get; set; }
        public Guid CertificateId { get; set; }
        public string XmlEncrypted { get; set; }
        public string XmlUnSign { get; set; }
        public DateTime CreationTime { get; set; }
        public SyncRequestBody SyncRequestBody { get; set; }
        public SyncResponse SyncResponse { get; set; }
    }
}
