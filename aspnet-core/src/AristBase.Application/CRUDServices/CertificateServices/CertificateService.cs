using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateServices
{
    public class CertificateService : AsyncCrudAppService<Certificate, CertificateDto, Guid, PagedAndSortedResultRequestDto, CreateCertificateDto, CertificateDto>
    {
        public CertificateService(IRepository<Certificate, Guid> repository) : base(repository)
        {
        }
 
    }
}
