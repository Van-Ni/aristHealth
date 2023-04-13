using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AristBase.BaseEntity;
using AristBase.CRUDServices.CertificateServices.Dto;
using AristBase.Interfaces;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.CertificateServices
{
    public class CertificateService : AsyncCrudAppService<Certificate, CertificateDto, Guid, PagedAndSortedResultDto, CreateCertificateDto, UpdateCertificateDto>
    {
        public CertificateService(IRepository<Certificate, Guid> repository) : base(repository)
        {
        }
        public async override Task<PagedResultDto<CertificateDto>> GetAllAsync(PagedAndSortedResultDto input)
        {
            CheckGetAllPermission();

            var query = CreateFilteredQuery(input);
            query = query.Include(i => i.ClientInfo).Include(i => i.CertificateType);
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            query = ApplySorting(query, input);
            query = ApplyPaging(query, input);

            var entities = await AsyncQueryableExecuter.ToListAsync(query);

            return new PagedResultDto<CertificateDto>(
                totalCount,
                entities.Select(MapToEntityDto).ToList()
            );
        }
        public async override Task<CertificateDto> CreateAsync(CreateCertificateDto input)
        {
            CheckCreatePermission();
            DateTime date1 = DateTime.ParseExact(input.ClientInfo.CreateTimeCCCD, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture);
            input.ClientInfo.CreateTimeCCCD = date1.ToString("dd-MM-yyyy");
            DateTime date = DateTime.ParseExact(input.ClientInfo.DateOfBirth, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture);
            input.ClientInfo.DateOfBirth = date.ToString("dd-MM-yyyy");
            var entity = MapToEntity(input);

            await Repository.InsertAsync(entity);
            await CurrentUnitOfWork.SaveChangesAsync();

            return MapToEntityDto(entity);
        }
        public override Task<CertificateDto> UpdateAsync(UpdateCertificateDto input)
        {
            DateTime parsedDate1;
            DateTime parsedDate2;

            if (DateTime.TryParseExact(input.ClientInfo.DateOfBirth, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate1))
            {

                DateTime date = DateTime.ParseExact(input.ClientInfo.DateOfBirth, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture);
                input.ClientInfo.DateOfBirth = date.ToString("dd-MM-yyyy");
            }
            if (DateTime.TryParseExact(input.ClientInfo.CreateTimeCCCD, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate2))
            {
                DateTime date1 = DateTime.ParseExact(input.ClientInfo.CreateTimeCCCD, "yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture);
                input.ClientInfo.CreateTimeCCCD = date1.ToString("dd-MM-yyyy");
            }
            return base.UpdateAsync(input);
        }
        public async Task<CertificateDto> GetProfile(Guid id)
        {
            CheckGetPermission();
            var get = await Repository.GetAll().Where(i => i.Id == id).Include(i => i.ClientInfo).FirstOrDefaultAsync();
            return MapToEntityDto(get);
        }
    }
}
