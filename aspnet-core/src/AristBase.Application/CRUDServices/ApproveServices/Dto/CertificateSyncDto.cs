using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AristBase.BaseEntity;
using AristBase.BaseEntity.XML;
using Newtonsoft.Json;
using System;

namespace AristBase.CRUDServices.ApproveServices.Dto
{
    [AutoMapFrom(typeof(CertificateSync))]
    [AutoMapTo(typeof(CertificateSync))]
    public class CertificateSyncDto : EntityDto<int>
    {
        public SyncStatus SyncStatus { get; set; }
        public CertificateDataSyncDTO MetaData { get; set; }
        public Guid CertificateId { get; set; }
        public string XmlEncrypted { get; set; }
        public virtual Certificate Certificate { get; set; }
    }
    [AutoMapFrom(typeof(CertificateDataSync))]
    [AutoMapTo(typeof(CertificateDataSync))]
    public class CertificateDataSyncDTO
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
        public string DIACHITHUONGTRU { get; set; }

        [JsonProperty("NGAYTHANGNAMCAPCMND")]
        public string NGAYTHANGNAMCAP { get; set; }

        [JsonProperty("SOCMND_PASSPORT")]
        public string SOCMND_PASSPORT { get; set; }

        [JsonProperty("MATINH_THUONGTRU")]
        public string MATINH_THUONGTRU { get; set; }

        [JsonProperty("MAHUYEN_THUONGTRU")]
        public string MAHUYEN_THUONGTRU { get; set; }

        [JsonProperty("SIGNDATA")]
        public string SIGNDATA { get; set; }
    }
}
