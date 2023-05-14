using Abp;
using Abp.Dependency;
using AristBase.CRUDServices.ApproveServices.Dto;
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AristBase.Services
{
    public class Response
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

    public class BHXHHttpService: AbpServiceBase, ISingletonDependency
    {
        private readonly HttpClient _httpClient;

        public BHXHHttpService(HttpClient httpClient)
        {
            this._httpClient = httpClient;
            this._httpClient.BaseAddress = new Uri("https://egw.baohiemxahoi.gov.vn");
            this._httpClient.DefaultRequestHeaders.Add("Username", "64A01_HSSK");
            this._httpClient.DefaultRequestHeaders.Add("Password", "8ff3554e5bd944fdce574ef6c534a88a");
        }
        public async Task<Response> SyncCertificate(SyncRequestBody body)
        {
            var json = JsonSerializer.Serialize(body);                          
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("/api/hssk/gksk", content);

            if(response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var authModel = JsonSerializer.Deserialize<Response>(result);
                return authModel;
            }
            throw new Exception("SyncError");
        }
    }
}
