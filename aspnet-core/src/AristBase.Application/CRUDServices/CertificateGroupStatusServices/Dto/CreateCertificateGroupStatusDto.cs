using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateGroupStatusServices.Dto
{
    public class CreateCertificateGroupStatusDto
    {
        public Guid CertificateId { get; set; }
        public string Group { get; set; }
        public bool status { get; set; }
        public int UserId { get; set; }
    }
}
