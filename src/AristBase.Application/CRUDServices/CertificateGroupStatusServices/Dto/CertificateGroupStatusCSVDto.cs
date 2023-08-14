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
    public class CertificateGroupStatusCSVDto
    {
        public int STT { get; set; }
        public string NgayThang { get; set; }
        public string HoTen { get; set; }
        public string CCCD { get; set; }
        public string Tuoi { get; set; }
        public string DiaChi { get; set; }
        public string HC { get; set; }
        public string BC { get; set; }
        public string TC { get; set; }
        public string DuongMau { get; set; }
        public string Ure { get; set; }
        public string Cre { get; set; }
        public string ASAT { get; set; }
        public string ALAT { get; set; }
        public string Duong { get; set; }
        public string Protein { get; set; }
        public string XetNghiemMauKhac { get; set; }
        public string XetNuocTieuKhac { get; set; }

    }
}
