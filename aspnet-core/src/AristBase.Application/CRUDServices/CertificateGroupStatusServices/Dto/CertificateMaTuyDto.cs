using Abp.AutoMapper;
using AristBase.BaseEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateGroupStatusServices.Dto
{
    [AutoMapFrom(typeof(CertificateGroupStatus))]
    [AutoMapTo(typeof(CertificateGroupStatus))]
    public class CertificateMaTuyDto
    {
        public int STT { get; set; }
        public string NgayThang { get; set; }
        public string HoTen { get; set; }
        public string Tuoi { get; set; }
        public string DiaChi { get; set; }
        public string Hang { get; set; }
        public string Morphine { get; set; }
        public string Amphetamin { get; set; }
        public string Methaphetamin { get; set; }
        public string Marijiana { get; set; }
        public string NongDoCon { get; set; }
        public string MaSoDoiTuong { get; set; }

    }
}
