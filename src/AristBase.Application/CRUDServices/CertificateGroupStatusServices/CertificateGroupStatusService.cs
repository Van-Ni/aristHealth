using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using AristBase.Authorization;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
using AristBase.CRUDServices.CertificateServices;
using AristBase.CRUDServices.CertificateServices.Dto;
using AristBase.Extensions;
using AristBase.Extensions.Storage;
using AristBase.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AristBase.CRUDServices.CertificateGroupStatusServices
{
    public class CertificateGroupStatusService : AsyncCrudAppService<CertificateGroupStatus, CertificateGroupStatusDto, Guid, Guid, CreateCertificateGroupStatusDto, CertificateGroupStatusDto>
    {
        private readonly IRepository<HistoryExport, Guid> _historyRepo;
        private readonly IStorageService storageService;
        public CertificateGroupStatusService(IRepository<CertificateGroupStatus, Guid> repository, IStorageService storageService, IRepository<HistoryExport, Guid> historyRepo) : base(repository)
        {
            this.storageService = storageService;
            _historyRepo = historyRepo;
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
}
