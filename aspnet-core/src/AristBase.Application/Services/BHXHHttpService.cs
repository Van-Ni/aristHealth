using Abp;
using Abp.Dependency;
using AristBase.BaseEntity.XML;
using AristBase.CRUDServices.ApproveServices.Dto;
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace AristBase.Services
{
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
        public async Task<SyncResponse> SyncCertificate(SyncRequestBody body)
        {
            var json = JsonSerializer.Serialize(body);                          
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("/api/hssk/gksk", content);

            if(response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var authModel = JsonSerializer.Deserialize<SyncResponse>(result);
                return authModel;
            }
            throw new Exception("SyncError");
        }
    }
}
