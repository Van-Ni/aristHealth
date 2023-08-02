using Abp.Application.Services.Dto;
using Abp.Application.Services;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Linq;
using AutoMapper.Internal.Mappers;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AristBase.BaseEntity;

namespace AristBase
{
    public abstract class TranslationCrudPermissionChangeableSingleUnitWithBaseServiceCrudAppService<TEntity, TEntityDto, TPrimaryKey, TTranslation, TUpdateInput, TCreateEntity> : CrudPermissionChangeableSingleUnitWithBaseServiceCrudAppService<TEntity, TEntityDto, TPrimaryKey, PagedAndSortedResultRequestDto, TCreateEntity, TUpdateInput>
      where TEntity : class, IEntity<TPrimaryKey>
      where TTranslation : class, IEntity, IEntityTranslation<TEntity, TPrimaryKey>
      where TEntityDto : IEntityDto<TPrimaryKey>
      where TUpdateInput : IEntityDto<TPrimaryKey>
    {
        private readonly IRepository<TTranslation> _translationRepository;
        private readonly IMapper mapper;


        protected TranslationCrudPermissionChangeableSingleUnitWithBaseServiceCrudAppService(
            IRepository<TEntity, TPrimaryKey> repository,
            string permissionName,
            IRepository<TTranslation> translationRepository,
            IMapper mapper)
            : base(repository, permissionName)
        {
            this._translationRepository = translationRepository;
            this.mapper = mapper;
        }

        protected TEntityDto MapToTranslateEntityDto(TEntity entity)
        {
            var mapObj = ObjectMapper.Map<TEntityDto>(entity);
            var translateTion = _translationRepository.GetAll().SingleOrDefault(t => t.CoreId.Equals(entity.Id) && t.Language == CultureInfo.CurrentUICulture.Name);
            if (translateTion != null)
            {
                return mapper.Map(translateTion, mapObj);
            }
            return mapObj;
        }
    }
    public abstract class CrudPermissionChangeableSingleUnitWithBaseServiceCrudAppService<TEntity, TEntityDto, TPrimaryKey> :
        CrudPermissionChangeableSingleUnitWithBaseServiceCrudAppService<TEntity, TEntityDto, TPrimaryKey, PagedAndSortedResultRequestDto, TEntityDto, TEntityDto>
      where TEntity : class, IEntity<TPrimaryKey>
      where TEntityDto : IEntityDto<TPrimaryKey>
    {
        public CrudPermissionChangeableSingleUnitWithBaseServiceCrudAppService(IRepository<TEntity, TPrimaryKey> repository, string permissionName)
            : base(repository, permissionName)
        {

        }

    }
    public abstract class CrudPermissionChangeableSingleUnitWithBaseServiceCrudAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput> : AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput>
        where TEntity : class, IEntity<TPrimaryKey>
        where TEntityDto : IEntityDto<TPrimaryKey>
        where TUpdateInput : IEntityDto<TPrimaryKey>
    {
        public CrudPermissionChangeableSingleUnitWithBaseServiceCrudAppService(IRepository<TEntity, TPrimaryKey> repository, string permissionName) : base(repository, permissionName)
        {
        }

        protected abstract void BuildNewEntity(TCreateInput input, TEntity entity);
        public override async Task<TEntityDto> CreateAsync(TCreateInput input)
        {
            CheckCreatePermission();

            var entity = MapToEntity(input);
            BuildNewEntity(input, entity);


            await Repository.InsertAsync(entity);
            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(entity);
        }
        protected abstract void BuildUpdateEntity(TUpdateInput input, TEntity entity);
        public override async Task<TEntityDto> UpdateAsync(TUpdateInput input)
        {
            CheckUpdatePermission();

            var query = Repository.GetAll();
            query = BaseQuery(query);

            var entity = await query
                .SingleAsync(p => p.Id.Equals(input.Id));




            BuildUpdateEntity(input, entity);
            try
            {
                await CurrentUnitOfWork.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }


            return MapToEntityDto(entity);
        }
    }
    public abstract class CrudPermissionChangeableSingleUnitServiceCrudAppService<TEntity, TEntityDto, TPrimaryKey> : AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey>
       where TEntity : class, IEntity<TPrimaryKey>
       where TEntityDto : IEntityDto<TPrimaryKey>
    {
        public CrudPermissionChangeableSingleUnitServiceCrudAppService(IRepository<TEntity, TPrimaryKey> repository, string permissionName)
            : base(repository, permissionName)
        {

        }
    }

    public abstract class CrudPermissionCrudAppService<TEntity, TEntityDto, TPrimaryKey> : AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
        where TEntityDto : IEntityDto<TPrimaryKey>
    {
        public CrudPermissionCrudAppService(IRepository<TEntity, TPrimaryKey> repository, string permissionName)
            : base(repository, permissionName)
        {

        }
    }

    public abstract class AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey>
        : AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey, PagedAndSortedResultRequestDto>
        where TEntity : class, IEntity<TPrimaryKey>
        where TEntityDto : IEntityDto<TPrimaryKey>
    {
        private IRepository<CertificateType, int> repository;

        protected AsyncCrudPermissonAppService(IRepository<TEntity, TPrimaryKey> repository, string permissionName)
            : base(repository, permissionName)
        {

        }
    }

    public abstract class AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput>
        : AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TEntityDto, TEntityDto>
        where TEntity : class, IEntity<TPrimaryKey>
        where TEntityDto : IEntityDto<TPrimaryKey>
    {
        protected AsyncCrudPermissonAppService(IRepository<TEntity, TPrimaryKey> repository, string permissionName)
            : base(repository, permissionName)
        {

        }
    }

    public abstract class AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput>
        : AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TCreateInput>
        where TGetAllInput : IPagedAndSortedResultRequest
        where TEntity : class, IEntity<TPrimaryKey>
        where TEntityDto : IEntityDto<TPrimaryKey>
       where TCreateInput : IEntityDto<TPrimaryKey>
    {
        protected AsyncCrudPermissonAppService(IRepository<TEntity, TPrimaryKey> repository, string permissionName)
            : base(repository, permissionName)
        {

        }
    }

    public abstract class AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput>
        : AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, EntityDto<TPrimaryKey>>
        where TEntity : class, IEntity<TPrimaryKey>
        where TEntityDto : IEntityDto<TPrimaryKey>
        where TUpdateInput : IEntityDto<TPrimaryKey>
    {
        protected virtual IQueryable<TEntity> BaseQuery(IQueryable<TEntity> query) => query;
        public override async Task<TEntityDto> GetAsync(EntityDto<TPrimaryKey> input)
        {
            CheckGetPermission();

            var query = Repository.GetAll();
            query = BaseQuery(query);

            var entity = await query.SingleAsync(e => e.Id.Equals(input.Id));

            return MapToEntityDto(entity);
        }
        public override async Task<PagedResultDto<TEntityDto>> GetAllAsync(TGetAllInput input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            query = BaseQuery(query);

            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<TEntityDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        protected AsyncCrudPermissonAppService(IRepository<TEntity, TPrimaryKey> repository, string permissionName)
            : base(repository, permissionName)
        {

        }
    }

    public abstract class AsyncCrudPermissonAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput>
    : AsyncCrudAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, TGetInput, EntityDto<TPrimaryKey>>
        where TEntity : class, IEntity<TPrimaryKey>
        where TEntityDto : IEntityDto<TPrimaryKey>
        where TUpdateInput : IEntityDto<TPrimaryKey>
        where TGetInput : IEntityDto<TPrimaryKey>
    {
        protected AsyncCrudPermissonAppService(IRepository<TEntity, TPrimaryKey> repository, string permissionName)
            : base(repository)
        {
            var baseName = $"Pages.{permissionName}";
            CreatePermissionName = $"{baseName}.Create";
            UpdatePermissionName = $"{baseName}.Update";
            GetAllPermissionName = GetPermissionName = $"{baseName}.Read";
            DeletePermissionName = $"{baseName}.Delete";
            LocalizationSourceName = AristBaseConsts.LocalizationSourceName;
        }
    }
}
