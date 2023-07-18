using AristBaseLib.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace AristBaseLib.HttpServices
{
    public class BHXHHttpService
    {
        private readonly HttpClient _httpClient;

        public BHXHHttpService(string username, string password)
        {
            this._httpClient = new HttpClient();
            this._httpClient.BaseAddress = new Uri("https://egw.baohiemxahoi.gov.vn");
            this._httpClient.DefaultRequestHeaders.Add("Username", username);
            this._httpClient.DefaultRequestHeaders.Add("Password", password);
        }
        public async Task<SyncResponse> SyncCertificate(SyncRequestBody body)
        {
            var json = JsonSerializer.Serialize(body);
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
