using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateGroupStatusServices
{
    public class CertificateGroupStatusService : AsyncCrudAppService<CertificateGroupStatus, CertificateGroupStatusDto, Guid, PagedAndSortedResultRequestDto, CreateCertificateGroupStatusDto, CertificateGroupStatusDto>
    {
        public CertificateGroupStatusService(IRepository<CertificateGroupStatus, Guid> repository) : base(repository)
        {
        }
    }
}
