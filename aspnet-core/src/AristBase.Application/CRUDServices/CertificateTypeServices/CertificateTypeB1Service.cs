using Abp.Application.Services;
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
    public class CertificateTypeB1Service : AsyncCrudPermissonAppService<CertificateType, CertificateTypeDto, int>
    {
        public CertificateTypeB1Service(IRepository<CertificateType, int> repository) : base(repository, PermissionNames.B1)
        {
        }
    }
}
