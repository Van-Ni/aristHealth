using Abp.Application.Services;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateKeyServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateKeyServices
{
    public class CertificateKeyService : AsyncCrudAppService<CertificateKey, CertificateKeyDto, Guid>
    {
        public CertificateKeyService(IRepository<CertificateKey, Guid> repository) : base(repository)
        {
        }
    }
}
