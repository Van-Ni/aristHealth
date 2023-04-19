using Abp.Application.Services;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Repositories;
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
