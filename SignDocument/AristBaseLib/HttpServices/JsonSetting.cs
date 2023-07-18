using System.Text.Json;

namespace AristBaseLib.HttpServices
{
    public static class JsonSetting
    {
        public static JsonSerializerOptions JsonOption = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }
}
