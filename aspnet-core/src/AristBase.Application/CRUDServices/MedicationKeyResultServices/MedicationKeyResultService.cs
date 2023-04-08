using Abp.Application.Services;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.MedicationKeyResultServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.MedicationKeyResultServices
{
    public class MedicationKeyResultB1Service : KeyValueBaseService
    {
        public MedicationKeyResultB1Service(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.B1)
        {
        }
    }
    public class MedicationKeyResultB2Service : KeyValueBaseService
    {
        public MedicationKeyResultB2Service(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.B2)
        {
        }
    }
    public class MedicationKeyResultB3Service : KeyValueBaseService
    {
        public MedicationKeyResultB3Service(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.B3)
        {
        }
    }
    public class MedicationKeyResultB4Service : KeyValueBaseService
    {
        public MedicationKeyResultB4Service(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.B4)
        {
        }
    }
    public class MedicationKeyResultB5Service : KeyValueBaseService
    {
        public MedicationKeyResultB5Service(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.B5)
        {
        }
    }
    public class MedicationKeyResultB6Service : KeyValueBaseService
    {
        public MedicationKeyResultB6Service(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.B6)
        {
        }
    }
    public class MedicationKeyResultB7Service : KeyValueBaseService
    {
        public MedicationKeyResultB7Service(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.B7)
        {
        }
    }
    public class MedicationKeyResultB8Service : KeyValueBaseService
    {
        public MedicationKeyResultB8Service(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.B8)
        {
        }
    }
    public class MedicationKeyResultB9Service : KeyValueBaseService
    {
        public MedicationKeyResultB9Service(IRepository<MedicationKeyResult, Guid> repository)
            : base(repository, PermissionNames.B9)
        {
        }
    }

}
