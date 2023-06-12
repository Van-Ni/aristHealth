using System.Text.Json.Serialization;

namespace AristBaseLib.DTO
{
    public class MetaData
    {
        [JsonPropertyName("SO")]
        public string SO { get; set; }

        [JsonPropertyName("LYDO")]
        public string LYDO { get; set; }

        [JsonPropertyName("HOTEN")]
        public string HOTEN { get; set; }

        [JsonPropertyName("MATUY")]
        public string MATUY { get; set; }

        [JsonPropertyName("STATE")]
        public string STATE { get; set; }

        [JsonPropertyName("NOICAP")]
        public string NOICAP { get; set; }

        [JsonPropertyName("KETLUAN")]
        public string KETLUAN { get; set; }

        [JsonPropertyName("BENHVIEN")]
        public string BENHVIEN { get; set; }

        [JsonPropertyName("NGAYKHAM")]
        public string NGAYKHAM { get; set; }

        [JsonPropertyName("NGAYSINH")]
        public string NGAYSINH { get; set; }

        [JsonPropertyName("NONGDOCON")]
        public string NONGDOCON { get; set; }

        [JsonPropertyName("IDBENHVIEN")]
        public string IDBENHVIEN { get; set; }

        [JsonPropertyName("GIOITINHVAL")]
        public string GIOITINHVAL { get; set; }

        [JsonPropertyName("HANGBANGLAI")]
        public string HANGBANGLAI { get; set; }

        [JsonPropertyName("NGAYKETLUAN")]
        public string NGAYKETLUAN { get; set; }

        [JsonPropertyName("NGAYKHAMLAI")]
        public string NGAYKHAMLAI { get; set; }

        [JsonPropertyName("BACSYKETLUAN")]
        public string BACSYKETLUAN { get; set; }

        [JsonPropertyName("DVINONGDOCON")]
        public string DVINONGDOCON { get; set; }

        [JsonPropertyName("TINHTRANGBENH")]
        public string TINHTRANGBENH { get; set; }

        [JsonPropertyName("MAXA_THUONGTRU")]
        public string MAXA_THUONGTRU { get; set; }

        [JsonPropertyName("DIACHITHUONGTRU")]
        public object DIACHITHUONGTRU { get; set; }

        [JsonPropertyName("NGAYTHANGNAMCAPCMND")]
        public string NGAYTHANGNAMCAPCMND { get; set; }

        [JsonPropertyName("SOCMND_PASSPORT")]
        public string SOCMND_PASSPORT { get; set; }

        [JsonPropertyName("MATINH_THUONGTRU")]
        public string MATINH_THUONGTRU { get; set; }

        [JsonPropertyName("MAHUYEN_THUONGTRU")]
        public string MAHUYEN_THUONGTRU { get; set; }

        [JsonPropertyName("SIGNDATA")]
        public object SIGNDATA { get; set; }
    }
}
