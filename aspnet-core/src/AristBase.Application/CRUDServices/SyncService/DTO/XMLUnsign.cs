using System.Xml.Serialization;
using System;
using Abp.AutoMapper;
using AristBase.BaseEntity.XML;

namespace AristBase.CRUDServices.SyncService.DTO
{
    [XmlRoot(ElementName = "root")]
    [AutoMapFrom(typeof(CertificateDataSync))]
    public class XMLUnsign
    {

        [XmlElement(ElementName = "UUID")]
        public string UUID { get; set; }

        [XmlElement(ElementName = "USERCREATE")]
        public string USERCREATE { get; set; }

        [XmlElement(ElementName = "STATUS")]
        public string STATUS { get; set; }

        [XmlElement(ElementName = "IDBENHVIEN")]
        public string IDBENHVIEN { get; set; }

        [XmlElement(ElementName = "ACTION")]
        public string ACTION { get; set; } // ACTION : 64A01LX2306999

        [XmlElement(ElementName = "BENHVIEN")]
        public string BENHVIEN { get; set; }

        [XmlElement(ElementName = "TUOI")]
        public int TUOI { get; set; } // CALCULATE

        [XmlElement(ElementName = "SO")]
        public string SO { get; set; }

        [XmlElement(ElementName = "HOTEN")]
        public string HOTEN { get; set; }

        [XmlElement(ElementName = "NGAYSINH")]
        public string NGAYSINH { get; set; }

        [XmlElement(ElementName = "SOCMND_PASSPORT")]
        public string SOCMND_PASSPORT { get; set; }

        [XmlElement(ElementName = "NGAYTHANGNAMCAPCMD")]
        public string NGAYTHANGNAMCAPCMND { get; set; }

        [XmlElement(ElementName = "NOICAP")]
        public string NOICAP { get; set; }

        [XmlElement(ElementName = "ECITIZENCODE")]
        public string ECITIZENCODE { get; set; }

        [XmlElement(ElementName = "MOBILE")]
        public string MOBILE { get; set; }

        [XmlElement(ElementName = "EMAIL")]
        public string EMAIL { get; set; }

        [XmlElement(ElementName = "DIACHITHUONGTRU")]
        public string DIACHITHUONGTRU { get; set; }

        [XmlElement(ElementName = "TINHTRANGBENH")]
        public string TINHTRANGBENH { get; set; }

        [XmlElement(ElementName = "NONGDOCON")]
        public string NONGDOCON { get; set; }

        [XmlElement(ElementName = "NGAYKETLUAN")]
        public string NGAYKETLUAN { get; set; }

        [XmlElement(ElementName = "NGAYKHAM")]
        public string NGAYKHAM { get; set; }

        [XmlElement(ElementName = "LYDO")]
        public string LYDO { get; set; }

        [XmlElement(ElementName = "NGAYKHAMLAI")]
        public string NGAYKHAMLAI { get; set; }

        [XmlElement(ElementName = "GIOITINHVAL")]
        public string GIOITINHVAL { get; set; }

        [XmlElement(ElementName = "MATINH_THUONGTRU")]
        public string MATINH_THUONGTRU { get; set; }

        [XmlElement(ElementName = "MAHUYEN_THUONGTRU")]
        public string MAHUYEN_THUONGTRU { get; set; }

        [XmlElement(ElementName = "MAXA_THUONGTRU")]
        public string MAXA_THUONGTRU { get; set; }

        [XmlElement(ElementName = "DVINONGDOCON")]
        public string DVINONGDOCON { get; set; }

        [XmlElement(ElementName = "MATUY")]
        public string MATUY { get; set; }

        [XmlElement(ElementName = "BACSYKETLUAN")]
        public string BACSYKETLUAN { get; set; }

        [XmlElement(ElementName = "KETLUAN")]
        public string KETLUAN { get; set; }

        [XmlElement(ElementName = "HANGBANGLAI")]
        public string HANGBANGLAI { get; set; }
    }
}
