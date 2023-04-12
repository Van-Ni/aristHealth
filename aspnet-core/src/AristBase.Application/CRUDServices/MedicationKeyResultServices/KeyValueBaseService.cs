using Abp;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
using AristBase.CRUDServices.MedicationKeyResultServices.Dto;
using AristBase.Interfaces;
using DocumentFormat.OpenXml.Vml.Office;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.MedicationKeyResultServices
{
    public abstract class KeyValueBaseService : AsyncCrudPermissonAppService<MedicationKeyResult, MedicationKeyResultDto, Guid, ParentPagedAndSortedResultRequestDto, CreateMedicationKeyResultDto, MedicationKeyResultDto>
    {
        private readonly string permissionName;
        private readonly IRepository<CertificateGroupStatus, Guid> repositoryCGS;

        public KeyValueBaseService(IRepository<MedicationKeyResult, Guid> repository, IRepository<CertificateGroupStatus, Guid> repositoryCGS, string permissionName) : base(repository, permissionName)
        {
            this.permissionName = permissionName;
            this.repositoryCGS = repositoryCGS;
        }

        protected void CustomCheckPermission(List<CreateMedicationKeyResultDto> input)
        {
            if (input.Any(i => !i.Key.StartsWith(permissionName.ToLower())))
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
        public async ValueTask<List<MedicationKeyResultDto>> CreateList([MinLength(1)]List<CreateMedicationKeyResultDto> input)
        {
            CheckCreatePermission();
            CustomCheckPermission(input);

            var list = new List<MedicationKeyResult>();

            try
            {
                foreach (var item in input)
                {
                    var entity = ObjectMapper.Map<MedicationKeyResult>(item);
                    list.Add(entity);

                }
                var addStatus = new CreateCertificateGroupStatusDto()
                {
                    CertificateId = input[0].CertificateId,
                    Group = input[0].Group.ToLower(),
                    status = true,
                    UserId = (long)AbpSession.UserId
                };
                await repositoryCGS.InsertAsync(ObjectMapper.Map<CertificateGroupStatus>(addStatus));
                await CurrentUnitOfWork.SaveChangesAsync();
                await Repository.InsertRangeAsync(list);
                await CurrentUnitOfWork.SaveChangesAsync();
            }

            catch (Exception ex) { throw new Exception(); }
            return ObjectMapper.Map<List<MedicationKeyResultDto>>(list);
        }
        public async ValueTask<List<MedicationKeyResultDto>> UpdateOrInsert(List<CreateMedicationKeyResultDto> input)
        {
            CheckCreatePermission();
            CustomCheckPermission(input);
            var list = new List<MedicationKeyResult>();
            var check = await Repository.GetAll().Where(w => w.CertificateId == input[0].CertificateId && w.Group == input[0].Group).ToListAsync();
            if (check.Count() > 0)
            {

                foreach (var item in check)
                {
                    var inputItem = input.FirstOrDefault(i => i.Key == item.Key);
                    if (inputItem != null)
                    {
                        item.Value = inputItem.Value;
                    }
                    list.Add(item);
                    await Repository.UpdateAsync(item);
                    await CurrentUnitOfWork.SaveChangesAsync();

                }
                return ObjectMapper.Map<List<MedicationKeyResultDto>>(list);
            }


            foreach (var item in input)
            {
                var entity = ObjectMapper.Map<MedicationKeyResult>(item);
                list.Add(entity);
            }
            await Repository.InsertRangeAsync(list);
            await CurrentUnitOfWork.SaveChangesAsync();
            return ObjectMapper.Map<List<MedicationKeyResultDto>>(list);
        }
        public async override Task<PagedResultDto<MedicationKeyResultDto>> GetAllAsync(ParentPagedAndSortedResultRequestDto input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            query = query.Where(w => w.CertificateId == input.CertificateId);
            if (input.Group != null)
            {
                query = query.Where(w => w.Group.Equals(input.Group));
            }
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<MedicationKeyResultDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        public IDictionary<string, KeyValueInfo> TaskGetAll(ParentPagedAndSortedResultRequestDto input)
        {
            return Repository.GetAll().Where(r => r.CertificateId == input.CertificateId).ToDictionary(c => c.Key, c => new KeyValueInfo
            {
                Value = c.Value,
            });
        }
    }
    public class KeyValueInfo
    {
        public string Value { get; set; }
        public long UserId { get; set; }
    }
}
