using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
using AristBase.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateGroupStatusServices
{
    public abstract class KeyValueBaseService : AsyncCrudAppService<CertificateGroupStatus, CertificateGroupStatusDto, Guid, ParentPagedAndSortedResultRequestDto, CreateCertificateGroupStatusDto, CertificateGroupStatusDto>
    {
        private string _permissionName;
        public KeyValueBaseService(IRepository<CertificateGroupStatus, Guid> repository) : base(repository)
        {
            LocalizationSourceName = AristBaseConsts.LocalizationSourceName;
        }
        protected virtual void SetPermision(string permissionName)
        {
            this._permissionName = permissionName;
            var baseName = $"Pages.{permissionName}";
            CreatePermissionName = $"{baseName}.Create";
            UpdatePermissionName = $"{baseName}.Update";
            GetAllPermissionName = GetPermissionName = $"{baseName}.Read";
            DeletePermissionName = $"{baseName}.Delete";

        }
        public virtual async ValueTask<CertificateGroupStatusDto> CreateList(CreateCertificateGroupStatusDto input)
        {
            SetPermision(input.Group);
            CheckCreatePermission();
            //CustomCheckPermission(input);
            var entity = ObjectMapper.Map<CertificateGroupStatus>(input);
            entity.Group = _permissionName;
            await Repository.InsertAsync(entity);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<CertificateGroupStatusDto>(entity);
        }
        public virtual async ValueTask<CertificateGroupStatusDto> UpdateOrInsert(UpdateCertificateGroupStatusDto input)
        {
            SetPermision(input.Group);
            CheckCreatePermission();
            var checkKl = await Repository.GetAll().Where(w => w.CertificateId == input.CertificateId && w.Group == PermissionNames.KetLuan && w.Status == GroupStatus.SUBMITTED).FirstOrDefaultAsync();
            if (checkKl == null)
            {
                var check = await Repository.GetAll().Where(w => w.CertificateId == input.CertificateId && input.Group.StartsWith(w.Group)).FirstOrDefaultAsync();
                if (check != null)
                {
                    if (input.Group == PermissionNames.KhamTheLucInput)
                    {
                        if (check.Status == GroupStatus.SUBMITTED)
                        {
                            throw new UserFriendlyException("Đã được duyệt bạn không thể nhập");
                        }
                        else
                        {
                            check.Content = input.Content;
                            check.UserId = AbpSession.UserId;
                            check.Status = GroupStatus.UNREADY;
                            await Repository.UpdateAsync(check);
                            await CurrentUnitOfWork.SaveChangesAsync();
                            return ObjectMapper.Map<CertificateGroupStatusDto>(check);
                        }
                    }
                    if(input.Group == PermissionNames.KhamTheLuc)
                    {
                        foreach (var kv in input.Content)
                        {
                            if (!string.IsNullOrEmpty(kv.Value.Value))
                            {
                                check.Content[kv.Key] = kv.Value;
                            }
                        }
                    }
                    else
                    {
                        check.Content = input.Content;
                        check.UserId = AbpSession.UserId;
                        check.Status = GroupStatus.SUBMITTED;
                        await Repository.UpdateAsync(check);
                        await CurrentUnitOfWork.SaveChangesAsync();
                        return ObjectMapper.Map<CertificateGroupStatusDto>(check);
                    }
                }
                var obj = ObjectMapper.Map<CertificateGroupStatus>(input);
                obj.UserId = AbpSession.UserId;
                await Repository.InsertAsync(obj);
                await CurrentUnitOfWork.SaveChangesAsync();
                return ObjectMapper.Map<CertificateGroupStatusDto>(input);
            }
            throw new UserFriendlyException("Đã kết luận, không được thay đổi dữ liệu");
        }
        public async override Task<PagedResultDto<CertificateGroupStatusDto>> GetAllAsync(ParentPagedAndSortedResultRequestDto input)
        {
            SetPermision(input.Group);
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

            return new PagedResultDto<CertificateGroupStatusDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }

    }
}