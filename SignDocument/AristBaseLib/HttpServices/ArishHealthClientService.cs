using System.Text.Json;
using System.Text;
using AristBaseLib.DTO;
using AristBaseLib.HttpServices;

namespace AristBaseLib
{
    public class ArishHealthClientService
    {
        private HttpClient _httpClient;
        public ArishHealthClientService(string? baseAddress, string? tenantId)
        {
            _httpClient = new HttpClient();
            if(baseAddress!=null && tenantId!=null)
            {
                SetConfig(baseAddress, tenantId);
            }
        }
        public void SetConfig(string baseAddress, string tenantId) {

            _httpClient.BaseAddress = new Uri(baseAddress);
            _httpClient.DefaultRequestHeaders.Add("Abp.TenantId", tenantId);
        }
        public async Task Login(string userName, string pass)
        {
            var json = JsonSerializer.Serialize(new
            {
                userNameOrEmailAddress = userName,
                password = pass
            }, JsonSetting.JsonOption);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("/api/TokenAuth/Authenticate", content);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var authModel = JsonSerializer.Deserialize<AuthReponse>(result);
                _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + authModel.result.accessToken);
                Console.WriteLine("Đăng nhập thành công: {0}" + response.StatusCode);
            }
            else
            {
                Console.WriteLine("Đăng nhập thất bại: {0}, retrying" + response.StatusCode);
            }
        }
        public async Task<SyncData> GetSyncCertificate()
        {

            var response = await _httpClient.GetAsync("/api/services/app/SyncService/GetSyncCertificate");
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var authModel = JsonSerializer.Deserialize<UnSignResponse>(result, JsonSetting.JsonOption);
                return authModel?.result;
            }
            await Console.Out.WriteLineAsync("Không tìm thấy dữ liệu để ký số");
            Thread.Sleep(20000);
            return null;
        }
        public async Task UpdateSigned(UpdateSyncRequest request)
        {
            var json = JsonSerializer.Serialize(request, JsonSetting.JsonOption);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PutAsync("/api/services/app/SyncService/UpdateXmlSyncSyncCertificate", content);
            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Ký thành công: {0}" + response.StatusCode);
            }
            else
            {
                Console.WriteLine("Ký số thất bại: {0}, retrying" + response.StatusCode);
            }
        }
        public async Task Update(CertificateSignedSyncDto request)
        {
            var json = JsonSerializer.Serialize(request, JsonSetting.JsonOption);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PutAsync("/api/services/app/SyncService/Update", content);
            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Đồng bộ thành công: {0}" + response.StatusCode);
            }
            else
            {
                Console.WriteLine("Đồng bộ thất bại: {0}, đang thử lại" + response.StatusCode);
            }
        }
    
        public async Task<CertificateSignedSyncDto> GetSignedCertificate()
        {
            var response = await _httpClient.GetAsync("/api/services/app/SyncService/GetReadyToSycnbody");
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var authModel = JsonSerializer.Deserialize<SyncSignedResponse>(result, JsonSetting.JsonOption);
                return authModel?.result;
            }
            await Console.Out.WriteLineAsync("Không tìm thấy giấy để đồng bộ");
            Thread.Sleep(20000);
            return null;
        }
    }
}