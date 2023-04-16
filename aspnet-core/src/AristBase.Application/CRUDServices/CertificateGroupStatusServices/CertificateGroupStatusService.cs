using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateGroupStatusServices
{
    public class CertificateGroupStatusService : AsyncCrudAppService<CertificateGroupStatus, CertificateGroupStatusDto, Guid, Guid, CreateCertificateGroupStatusDto, CertificateGroupStatusDto>
    {
        public CertificateGroupStatusService(IRepository<CertificateGroupStatus, Guid> repository) : base(repository)
        {
        }
        public async override Task<PagedResultDto<CertificateGroupStatusDto>> GetAllAsync(Guid input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            query = query.Where(w => w.CertificateId == input).Include(i => i.User);
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<CertificateGroupStatusDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        public override async Task<CertificateGroupStatusDto> CreateAsync(CreateCertificateGroupStatusDto input)
        {
            var getData = await Repository.GetAll().FirstOrDefaultAsync(w => w.CertificateId == input.CertificateId && w.Group == "cdv");
            if (getData != null)
            {
                throw new InvalidOperationException();
            }
            return await base.CreateAsync(input);
        }
    }
   
    public class GetDataService : AsyncCrudAppService<CertificateGroupStatus, CertificateGroupStatusDto, Guid, Guid>
    {
        public GetDataService(IRepository<CertificateGroupStatus, Guid> repository)
            : base(repository)
        {
        }
        public async override Task<PagedResultDto<CertificateGroupStatusDto>> GetAllAsync(Guid id)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(id);
            query = query.Where(w => w.CertificateId == id);

            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<CertificateGroupStatusDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        public async ValueTask<IEnumerable<CertificateGroupStatusDto>> GetDataAllAsync(Guid id)
        {
            CheckGetAllPermission();
            var entities = await Repository.GetAll().Where(w => w.CertificateId == id).ToListAsync();

            return ObjectMapper.Map<IEnumerable<CertificateGroupStatusDto>>(entities);
        }
        public override Task<CertificateGroupStatusDto> CreateAsync(CertificateGroupStatusDto input)
        {
            throw new NotImplementedException();
        }
        public override Task DeleteAsync(EntityDto<Guid> input)
        {
            throw new NotImplementedException();
        }
        public override Task<CertificateGroupStatusDto> UpdateAsync(CertificateGroupStatusDto input)
        {
            throw new NotImplementedException();
        }
    }
}
