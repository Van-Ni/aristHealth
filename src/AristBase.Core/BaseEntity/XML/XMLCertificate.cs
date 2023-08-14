
using Newtonsoft.Json;

namespace AristBase.BaseEntity.XML
{   
    public class CertificateDataSync
    {
        [JsonProperty("SO")]
        public string SO { get; set; }

        [JsonProperty("LYDO")]
        public string LYDO { get; set; }

        [JsonProperty("HOTEN")]
        public string HOTEN { get; set; }

        [JsonProperty("MATUY")]
        public string MATUY { get; set; }

        [JsonProperty("STATE")]
        public string STATE { get; set; }

        [JsonProperty("NOICAP")]
        public string NOICAP { get; set; }

        [JsonProperty("KETLUAN")]
        public string KETLUAN { get; set; }

        [JsonProperty("BENHVIEN")]
        public string BENHVIEN { get; set; }

        [JsonProperty("NGAYKHAM")]
        public string NGAYKHAM { get; set; }

        [JsonProperty("NGAYSINH")]
        public string NGAYSINH { get; set; }

        [JsonProperty("NONGDOCON")]
        public string NONGDOCON { get; set; }

        [JsonProperty("IDBENHVIEN")]
        public string IDBENHVIEN { get; set; }

        [JsonProperty("GIOITINHVAL")]
        public string GIOITINHVAL { get; set; }

        [JsonProperty("HANGBANGLAI")]
        public string HANGBANGLAI { get; set; }

        [JsonProperty("NGAYKETLUAN")]
        public string NGAYKETLUAN { get; set; }

        [JsonProperty("NGAYKHAMLAI")]
        public string NGAYKHAMLAI { get; set; }

        [JsonProperty("BACSYKETLUAN")]
        public string BACSYKETLUAN { get; set; }

        [JsonProperty("DVINONGDOCON")]
        public string DVINONGDOCON { get; set; }

        [JsonProperty("TINHTRANGBENH")]
        public string TINHTRANGBENH { get; set; }

        [JsonProperty("MAXA_THUONGTRU")]
        public string MAXA_THUONGTRU { get; set; }

        [JsonProperty("DIACHITHUONGTRU")]
        public string DIACHITHUONGTRU { get; set; } //TODO: Convert from provice

        [JsonProperty("NGAYTHANGNAMCAPCMND")]
        public string NGAYTHANGNAMCAPCMND { get; set; }

        [JsonProperty("SOCMND_PASSPORT")]
        public string SOCMND_PASSPORT { get; set; }

        [JsonProperty("MATINH_THUONGTRU")]
        public string MATINH_THUONGTRU { get; set; }

        [JsonProperty("MAHUYEN_THUONGTRU")]
        public string MAHUYEN_THUONGTRU { get; set; }
    }
}
