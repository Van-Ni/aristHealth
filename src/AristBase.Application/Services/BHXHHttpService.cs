using Abp;
using Abp.Dependency;
using AristBase.BaseEntity.XML;
using AristBase.CRUDServices.ApproveServices.Dto;
using AristBase.Services.Caching;
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace AristBase.Services
{
    public class BHXHHttpService: AbpServiceBase, ITransientDependency
    {
        private readonly HttpClient _httpClient;
        private readonly IHospitalSettingCache _hospitalSettingCache;

        public BHXHHttpService(HttpClient httpClient, IHospitalSettingCache hospitalSettingCache)
        {
            this._httpClient = httpClient;
            this._hospitalSettingCache = hospitalSettingCache;
            this._httpClient.BaseAddress = new Uri("https://egw.baohiemxahoi.gov.vn");
           
        }
        public async Task<SyncResponse> SyncCertificate(SyncRequestBody body, int tenantId)
        {
            
            var json = JsonSerializer.Serialize(body);
            var curSetting = _hospitalSettingCache.Get(tenantId);
            this._httpClient.DefaultRequestHeaders.Add("Username", curSetting.UserName);
            this._httpClient.DefaultRequestHeaders.Add("Password", curSetting.PasswordMD5);

            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("/api/hssk/gksk", content);
            
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var authModel = JsonSerializer.Deserialize<SyncResponse>(result);
                return authModel;
            }
            throw new Exception("SyncError");
        }
    }
}
