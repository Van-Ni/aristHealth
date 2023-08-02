using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateTypeServices.Dto;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateTypeServices
{
    public class CertificateTypeService : AsyncCrudAppService<CertificateType, CertificateTypeDto, int, PagedAndSortedResultRequestDto, CreateCertificateTypeDto, CertificateTypeDto>
    {
        public CertificateTypeService(IRepository<CertificateType, int> repository) : base(repository)
        {
        }
    }
}
