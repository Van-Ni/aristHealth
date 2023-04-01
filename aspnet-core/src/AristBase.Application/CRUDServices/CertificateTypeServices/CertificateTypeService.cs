using Abp.Application.Services;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateTypeServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateTypeServices
{
    public class CertificateTypeService : AsyncCrudAppService<CertificateType, CertificateTypeDto, int>
    {
        public CertificateTypeService(IRepository<CertificateType, int> repository) : base(repository)
        {
        }
    }
}
