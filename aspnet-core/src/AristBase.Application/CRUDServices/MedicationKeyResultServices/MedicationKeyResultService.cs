using Abp.Application.Services;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.MedicationKeyResultServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.MedicationKeyResultServices
{
    public class MedicationKeyResultService : AsyncCrudAppService<MedicationKeyResult, MedicationKeyResultDto, Guid>
    {
        public MedicationKeyResultService(IRepository<MedicationKeyResult, Guid> repository) : base(repository)
        {
        }
    }
}
