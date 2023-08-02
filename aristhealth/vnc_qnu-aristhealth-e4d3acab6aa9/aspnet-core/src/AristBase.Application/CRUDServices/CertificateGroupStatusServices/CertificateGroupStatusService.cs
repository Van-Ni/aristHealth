using Abp;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateGroupStatusServices.Dto;
using AristBase.CRUDServices.MedicationKeyResultServices.Dto;
using AristBase.Interfaces;
using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
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
}
