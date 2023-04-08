using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.MedicationKeyResultServices.Dto;
using AristBase.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.MedicationKeyResultServices
{
    public abstract class KeyValueBaseService : AsyncCrudPermissonAppService<MedicationKeyResult, MedicationKeyResultDto, Guid, ParentPagedAndSortedResultRequestDto, CreateMedicationKeyResultDto, MedicationKeyResultDto>
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
            //CheckCreatePermission();
            //CustomCheckPermission(input);

            var list = new List<MedicationKeyResult>();
            foreach (var item in input)
            {
                var entity = ObjectMapper.Map<MedicationKeyResult>(item);              
                list.Add(entity);
            }
            await Repository.InsertRangeAsync(list);
            return ObjectMapper.Map<List<MedicationKeyResultDto>>(list);
        }
        public override Task<PagedResultDto<MedicationKeyResultDto>> GetAllAsync(ParentPagedAndSortedResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }
        public IDictionary<string, KeyValueInfo> TaskGetAll(ParentPagedAndSortedResultRequestDto input)
        {
            return Repository.GetAll().Where(r => r.CertificateId == input.CertificateId).ToDictionary(c => c.Key, c => new KeyValueInfo
            {
                Value = c.Value,
                UserId = c.UserId
            });
        }
    }
    public class KeyValueInfo
    {
        public string Value { get; set; }
        public long UserId { get; set; }
    }
}
