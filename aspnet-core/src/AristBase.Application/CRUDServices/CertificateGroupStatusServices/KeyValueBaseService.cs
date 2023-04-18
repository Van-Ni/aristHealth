using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
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
            CheckUpdatePermission();
            //CustomCheckPermission(input);
            var check = await Repository.GetAll().Where(w => w.CertificateId == input.CertificateId && w.Group == this._permissionName).FirstOrDefaultAsync();
            if (check != null)
            {
                check.Content = input.Content;
                check.UserId = AbpSession.UserId;
                check.Status = GroupStatus.SUBMITTED;
                await Repository.UpdateAsync(check);
                await CurrentUnitOfWork.SaveChangesAsync();

                return ObjectMapper.Map<CertificateGroupStatusDto>(check);
            }
            var obj = ObjectMapper.Map<CertificateGroupStatus>(input);
            obj.UserId = AbpSession.UserId;
            await Repository.InsertAsync(obj);
            await CurrentUnitOfWork.SaveChangesAsync();
            return ObjectMapper.Map<CertificateGroupStatusDto>(input);
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