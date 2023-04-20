using System.Xml.Serialization;

namespace AristBase.BaseEntity.XML
{

    [XmlRoot(ElementName = "root")]
    public class CertificateXML
    {

        [XmlElement(ElementName = "UUID")]
        public string UUID { get; set; }

        [XmlElement(ElementName = "CREATEDDATE")]
        public string CREATEDDATE { get; set; }

        [XmlElement(ElementName = "USERCREATE")]
        public string USERCREATE { get; set; }

        [XmlElement(ElementName = "STATUS")]
        public string STATUS { get; set; }

        [XmlElement(ElementName = "SO")]
        public string SO { get; set; }

        [XmlElement(ElementName = "HOTEN")]
        public string HOTEN { get; set; }

        [XmlElement(ElementName = "NGAYSINH")]
        public string NGAYSINH { get; set; }

        [XmlElement(ElementName = "GIOITINHVAL")]
        public string GIOITINHVAL { get; set; }

        [XmlElement(ElementName = "SOCMND_PASSPORT")]
        public string SOCMNDPASSPORT { get; set; }

        [XmlElement(ElementName = "NGAYTHANGNAMCAP")]
        public string NGAYTHANGNAMCAP { get; set; }

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

        [XmlElement(ElementName = "MATINH_THUONGTRU")]
        public string MATINHTHUONGTRU { get; set; }

        [XmlElement(ElementName = "MAHUYEN_THUONGTRU")]
        public string MAHUYENTHUONGTRU { get; set; }

        [XmlElement(ElementName = "MAXA_THUONGTRU")]
        public string MAXATHUONGTRU { get; set; }

        [XmlElement(ElementName = "NONGDOCON")]
        public string NONGDOCON { get; set; }

        [XmlElement(ElementName = "DVINONGDOCON")]
        public string DVINONGDOCON { get; set; }

        [XmlElement(ElementName = "MATUY")]
        public string MATUY { get; set; }

        [XmlElement(ElementName = "KETLUAN")]
        public string KETLUAN { get; set; }

        [XmlElement(ElementName = "HANGBANGLAI")]
        public string HANGBANGLAI { get; set; }

        [XmlElement(ElementName = "NGAYKETLUAN")]
        public string NGAYKETLUAN { get; set; }

        [XmlElement(ElementName = "BACSYKETLUAN")]
        public string BACSYKETLUAN { get; set; }

        [XmlElement(ElementName = "NGAYKHAMLAI")]
        public string NGAYKHAMLAI { get; set; }

        [XmlElement(ElementName = "LYDO")]
        public string LYDO { get; set; }

        [XmlElement(ElementName = "TINHTRANGBENH")]
        public string TINHTRANGBENH { get; set; }
    }
    public class CertificateDataSync
    {
        public string SO { get; set; }
        public string NGAYKHAM { get; set; }
        public string HOTEN { get; set; }
        public string GIOITINHVAL { get; set; }
        public string NGAYSINH { get; set; }
        public string DIACHITHUONGTRU { get; set; }
        public string MATINH_THUONGTRU { get; set; }
        public string MAHUYEN_THUONGTRU { get; set; }
        public string MAXA_THUONGTRU { get; set; }
        public string SOCMND_PASSPORT { get; set; }
        public string NGAYTHANGNAMCAP { get; set; }
        public string NOICAP { get; set; }
        public string IDBENHVIEN { get; set; }
        public string BENHVIEN { get; set; }
        public string NONGDOCON { get; set; }
        public string DVINONGDOCON { get; set; }
        public string MATUY { get; set; }
        public string NGAYKETLUAN { get; set; }
        public string BACSYKETLUAN { get; set; }
        public string KETLUAN { get; set; }
        public string HANGBANGLAI { get; set; }
        public string NGAYKHAMLAI { get; set; }
        public string LYDO { get; set; }
        public string TINHTRANGBENH { get; set; }
        public string STATE { get; set; }
        public string SIGNDATA { get; set; }
    }
}
