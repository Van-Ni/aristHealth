using Abp.Application.Services;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
using Abp.UI;
using AristBase.BaseEntity;
using AristBase.CRUDServices.RegionsServices.Dto;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AristBase.CRUDServices.RegionsServices
{
    public class RegionService : ApplicationService
    {
        private readonly IRepository<Region, string> _repository;
        public RegionService(IRepository<Region, string> _repository)
        {
            this._repository = _repository;
        }
        public async ValueTask<IEnumerable<RegionDto>> GetAll(string? tinhId, string? huyenId)
        {
            if (huyenId != null)
            {
                return await _repository.GetAll().Where(w => w.ParentId == huyenId).Select(w => ObjectMapper.Map<RegionDto>(w)).ToListAsync();
            }
            if (tinhId != null)
            {
                return await _repository.GetAll().Where(w => w.ParentId == tinhId).Select(w => ObjectMapper.Map<RegionDto>(w)).ToListAsync();
            }
            return await _repository.GetAll().Where(w => w.ParentId == null).Select(w => ObjectMapper.Map<RegionDto>(w)).ToListAsync();
        }
        public async ValueTask<RegionFull> GetByName(string address)
        {
            var adds = address.Split(",").Select(a => a.Trim());
            if (adds.Count() >= 3)
            {                
                var provinceadd = adds.TakeLast(1).Single();
                var dictrictadd = adds.SkipLast(1).TakeLast(1).Single();
                var commuteadd = adds.SkipLast(2).TakeLast(1).Single();
                var provinceDto = await _repository.GetAll()
                    .Where(w => w.ParentId == null && w.Name.Contains(provinceadd))
                    .Select(w=>ObjectMapper.Map<RegionDto>(w))
                    .SingleAsync();
                var dictrict = await _repository.GetAll()
                    .Where(w => w.ParentId == provinceDto.Id && w.Name.Contains(dictrictadd))
                    .Select(w => ObjectMapper.Map<RegionDto>(w))
                    .SingleAsync();
                var commute = await _repository.GetAll()
                    .Where(w => w.ParentId == dictrict.Id && w.Name.Contains(commuteadd))
                    .Select(w => ObjectMapper.Map<RegionDto>(w))
                    .SingleAsync();

                return new RegionFull
                {
                    Commute= commute,
                    Dictrict= dictrict,
                    Province= provinceDto
                };
            }
            throw new UserFriendlyException("Có lỗi xảy ra khi lấy địa chỉ của khách hàng, vui lòng tự nhập địa chỉ");
        }
        public async ValueTask<List<RegionDto>> Create(List<RegionDto> input)
        {
            try
            {
                var obj = ObjectMapper.Map<List<Region>>(input);
                await _repository.InsertRangeAsync(obj);
                await CurrentUnitOfWork.SaveChangesAsync();
                return ObjectMapper.Map<List<RegionDto>>(obj);
            }
            catch (Exception ex) { throw; }
        }
    }
}
