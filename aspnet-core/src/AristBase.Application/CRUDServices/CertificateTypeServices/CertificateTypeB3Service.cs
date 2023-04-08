﻿using Abp.Domain.Repositories;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateTypeServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateTypeServices
{
    public class CertificateTypeB3Service : AsyncCrudPermissonAppService<CertificateType, CertificateTypeDto, int>
    {
        public CertificateTypeB3Service(IRepository<CertificateType, int> repository) : base(repository, PermissionNames.B3)
        {
        }
    }
}
