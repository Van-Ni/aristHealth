using Abp.AutoMapper;
using AristBase.BaseEntity;

namespace AristBase.CRUDServices.CertificateServices.Dto
{
    [AutoMapFrom(typeof(Certificate))]
    [AutoMapTo(typeof(Certificate))]
    public class ExportCertificateDto
    {
        //public string  { get; set; }
        //public string 
    }
}
