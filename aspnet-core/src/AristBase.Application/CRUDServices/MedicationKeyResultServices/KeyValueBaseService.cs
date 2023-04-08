using Abp.Application.Services;
using Abp.Authorization;
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
    public abstract class KeyValueBaseService : AsyncCrudPermissonAppService<MedicationKeyResult, MedicationKeyResultDto, Guid, MedicationKeyResultDto, CreateMedicationKeyResultDto, MedicationKeyResultDto>
    {
        private readonly string permissionName;

        protected KeyValueBaseService(IRepository<MedicationKeyResult, Guid> repository, string permissionName) : base(repository, permissionName)
        {
            this.permissionName = permissionName;
        }
        protected void CustomCheckPermission(List<CreateMedicationKeyResultDto> input)
        {
            if (input.Any(i => !i.Key.StartsWith(permissionName)))
            {
                throw new AbpAuthorizationException(
                    string.Format(
                        L(
                            "KeyNotAllow"
                        )
                    )
                );
            }
        }
        public async ValueTask<List<MedicationKeyResultDto>> CreateList(List<CreateMedicationKeyResultDto> input)
        {
            CheckCreatePermission();
            CustomCheckPermission(input);

            var list = new List<MedicationKeyResult>();
            foreach (var item in input)
            {
                var entity = ObjectMapper.Map<MedicationKeyResult>(item);

                await Repository.InsertAsync(entity);
                await CurrentUnitOfWork.SaveChangesAsync();
                list.Add(entity);
            }
            return ObjectMapper.Map<List<MedicationKeyResultDto>>(list);
        }
    }
}
